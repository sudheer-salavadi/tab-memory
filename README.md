# 🗂️ Tidy Tabs

**Tidy Tabs** is a Chrome extension that helps you organize and manage your open tabs by grouping them based on **domain**, **subdomain**, or **page title** — and gives you the power to close tabs individually, by group, or all at once.

Every time you open a new tab (`⌘+T` or `Ctrl+T`), **Tidy Tabs** automatically displays a smart overview of all your open tabs — letting you quickly review, group, and close them to keep your browser clutter-free.

![Tidy Tabs Screenshot](public/screenshots/tidy-tabs.jpg)

Built with [Solid.js](https://solidjs.com), [TailwindCSS](https://tailwindcss.com), and [Vite](https://vitejs.dev).

---

## 🚀 Features

- ✅ Group tabs by domain, subdomain, or page title  
- ✅ Close individual tabs or entire groups with one click  
- ✅ Clean, fast, and responsive UI (with dark mode support)  
- ✅ Shows total number of open tabs  
- ✅ Easy-to-use Chrome Extension with custom new tab override

---

## 📦 Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/sudheer-salavadi/tidy-tabs.git
   cd tidy-tabs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the extension:

   ```bash
   npm run build
   ```

4. Load it in Chrome:
   - Go to `chrome://extensions`
   - Enable **Developer mode**
   - Click **"Load unpacked"**
   - Select the `dist/` folder

---

## 🔧 Scripts

```bash
npm run dev     # Start development server at http://localhost:5173
npm run build   # Build extension to dist/
npm run preview # Preview production build
```

---

## 🌐 Tech Stack

- **Framework:** [Solid.js](https://solidjs.com)
- **Styling:** [TailwindCSS](https://tailwindcss.com)
- **Bundler:** [Vite](https://vitejs.dev)

---

## 📁 Folder Structure

```
tidy-tabs/
├── public/           # manifest.json and icons
├── src/              # Solid components and styles
├── dist/             # Final build output
├── vite.config.js    # Build config with copy plugin for icons
└── package.json
```

---

## 📜 License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

For more information, please refer to <http://unlicense.org/>

---

## 💡 Future Ideas

- Tab memory usage tracking
- Auto-clean tab groups by inactivity
- Keyboard shortcuts for tab actions

---

## 🙌 Contribute or Suggest

Pull requests, issues, and feature suggestions welcome!
