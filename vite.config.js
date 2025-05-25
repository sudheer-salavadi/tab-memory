import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import copy from "rollup-plugin-copy";

export default defineConfig({
  plugins: [
    solid(),
    tailwindcss(),
    copy({
      targets: [
        { src: "icon", dest: "dist" } 
      ],
      hook: "writeBundle",
    }),
  ],
  build: {
    outDir: "dist", // Output directory for the build
    assetsDir: "assets", // Subdirectory for assets (CSS, JS, etc.)
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js", // Main JS files
        chunkFileNames: "assets/[name]-[hash].js", // Dynamically imported chunks
        assetFileNames: "assets/[name]-[hash].[ext]", // Other assets (e.g., CSS, images)
      },
    },
  },
});