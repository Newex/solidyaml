import type { Plugin } from "rollup";
import { transformer } from "./transformer";


export default function myPlugin(): Plugin {

  return {
    name: 'vite-plugin-solidYaml',
    transform: transformer
   }
}