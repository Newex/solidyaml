import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import solidYaml from "@newex/solidyaml";

export default defineConfig({
	plugins: [sveltekit(), solidYaml()]
});
