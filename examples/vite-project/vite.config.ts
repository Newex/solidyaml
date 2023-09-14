import { defineConfig } from 'vite'
import solidYaml from "@opensource/solidyaml"

export default defineConfig({
  plugins: [solidYaml()]
})