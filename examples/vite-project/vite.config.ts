import { defineConfig } from 'vite'
import solidYaml from "@opensource/vite-plugin-solidyaml"

export default defineConfig({
  plugins: [solidYaml()]
})