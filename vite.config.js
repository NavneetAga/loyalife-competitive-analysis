import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes the build work from any sub-path,
// which is what GitHub Pages project sites (username.github.io/repo/) need.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
