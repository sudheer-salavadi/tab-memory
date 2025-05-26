// Solid.js Chrome Extension - Updated Styles with ShadCN and Pointer Cursor
import { createSignal, onMount } from "solid-js";

function App() {
  const [tabGroups, setTabGroups] = createSignal({});
  const [currentTabId, setCurrentTabId] = createSignal(null);
  const [groupingOption, setGroupingOption] = createSignal("domain");
  const [totalTabCount, setTotalTabCount] = createSignal(0);
  const [allTabsClosed, setAllTabsClosed] = createSignal(false);

  const groupTabsByOption = (tabs, option) => {
    const groups = {};
    tabs.forEach((tab) => {
      const url = new URL(tab.url);
      let groupKey;
      switch (option) {
        case "domain":
          groupKey = url.hostname.split(".").slice(-2).join("."); // Main domain
          break;
        case "subdomain":
          groupKey = url.hostname; // Full hostname with subdomain
          break;
        case "title":
          groupKey = tab.title; // Group by page title
          break;
        default:
          groupKey = "Other";
      }

      if (!groupKey) {
        groupKey = "Blank Tabs";
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(tab);
    });
    return groups;
  };

  const fetchTabs = async () => {
    return new Promise((resolve) => {
      chrome.tabs.query({}, (tabs) => {
        if (!tabs) {
          console.error("No tabs found.");
          resolve({});
          return;
        }

        // Exclude the current tab
        const filteredTabs = tabs.filter((tab) => tab.id !== currentTabId());
        setTotalTabCount(filteredTabs.length); // Update the total tab count
        const groups = groupTabsByOption(filteredTabs, groupingOption());
        resolve(groups);
      });
    });
  };

  const refreshTabGroups = async () => {
    const groups = await fetchTabs();
    setTabGroups(groups);
    if (Object.keys(groups).length === 0) {
      setAllTabsClosed(true);
    }
  };

  const closeTab = (tabId) => {
    chrome.tabs.remove(tabId, () => {
      refreshTabGroups();
    });
  };

  const closeAllTabs = () => {
    chrome.tabs.query({}, (tabs) => {
      if (!tabs) {
        console.error("No tabs to close.");
        return;
      }

      const tabIds = tabs.filter((tab) => tab.id !== currentTabId()).map((tab) => tab.id);
      chrome.tabs.remove(tabIds, () => {
        setAllTabsClosed(true);
      });
    });
  };

  const closeAllTabsInGroup = (group) => {
    const tabIds = group.map((tab) => tab.id);
    chrome.tabs.remove(tabIds, () => {
      refreshTabGroups();
    });
  };

  const formatTabText = (count) => (count === 1 ? "1 tab" : `${count} tabs`);

  onMount(() => {
    // Fetch the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        setCurrentTabId(tabs[0].id);
      } else {
        console.error("No active tab found.");
        setCurrentTabId(null);
      }
    });

    // Fetch and group tabs
    refreshTabGroups();
  });

  return (
    <div class="p-6 bg-gray-100 dark:bg-gray-900 w-screen mx-auto">
      {allTabsClosed() ? (
        <div class="flex justify-center items-center h-screen text-3xl font-bold text-gray-800 dark:text-gray-100">
          Peace ✌️
        </div>
      ) : (
        <>
          <h1 class="lg:text-2xl text-lg font-bold mb-2 text-center text-gray-800 dark:text-gray-100">🗂️ Tidy Tabs</h1>
          <p class="text-center mb-6 text-gray-600 dark:text-gray-400">
            Open: <span class="font-semibold">{formatTabText(totalTabCount())}</span>
            <button
              onClick={closeAllTabs}
              class="ml-4 underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 cursor-pointer"
            >
              Close All Tabs
            </button>
          </p>

          <div class="mb-6 flex flex-row flex-wrap gap-5 items-center mx-auto justify-center">
            <label class="flex items-center gap-1 mb-2 text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="grouping"
                value="domain"
                checked={groupingOption() === "domain"}
                onChange={() => {
                  setGroupingOption("domain");
                  refreshTabGroups();
                }}
                class="accent-blue-600 dark:accent-blue-400 cursor-pointer"
              />
              Group by Domain <br>(e.g., google.com, google.com/maps, mail.google.com)</br>
            </label>
            <label class="flex items-center gap-1 mb-2 text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="grouping"
                value="subdomain"
                checked={groupingOption() === "subdomain"}
                onChange={() => {
                  setGroupingOption("subdomain");
                  refreshTabGroups();
                }}
                class="accent-blue-600 dark:accent-blue-400 cursor-pointer"
              />
              Separate Subdomains<br> (e.g., mail.google.com, google.com)</br>
            </label>
            <label class="flex items-center gap-1 mb-2 text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="grouping"
                value="title"
                checked={groupingOption() === "title"}
                onChange={() => {
                  setGroupingOption("title");
                  refreshTabGroups();
                }}
                class="accent-blue-600 dark:accent-blue-400 cursor-pointer"
              />
              Group by Page Titles <br>(e.g., tabs with identical titles)</br>
            </label>
          </div>

          <div class="space-y-6 w-full xl:w-1/2 mx-auto">
            {Object.entries(tabGroups()).map(([groupKey, group]) => (
              <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                <div class="flex justify-between items-center mb-4 px-2">
                  <h2 class="text-lg font-semibold truncate text-gray-800 dark:text-gray-100">
                    {groupKey} ({formatTabText(group.length)})
                  </h2>
                  <button
                    onClick={() => closeAllTabsInGroup(group)}
                    class="bg-gray-100 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-2 py-1 rounded-lg cursor-pointer"
                  >
                    Close All
                  </button>
                </div>
                <ul class="space-y-2">
                  {group.map((tab) => (
                    <li class="flex justify-between items-center px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <div class="flex items-center space-x-2 overflow-hidden">
                        <img
                          src={tab.favIconUrl || "/icon/48.png"}
                          alt="favicon"
                          class="w-6 h-6"
                        />
                        <div class="truncate max-w-full">
                          <p class="text-sm font-medium truncate max-w-[80%] text-gray-800 dark:text-gray-100">
                            {tab.title}
                          </p>
                          <p class="text-xs text-gray-500 truncate max-w-[80%] dark:text-gray-400">{tab.url}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => closeTab(tab.id)}
                        class="bg-gray-100 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-2 py-1 rounded cursor-pointer rounded-lg"
                      >
                        Close
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}



export default App;
