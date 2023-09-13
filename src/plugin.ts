import type { Plugin } from "rollup";
import { transformer } from "./transformer.js";


export default function solidYaml(): Plugin {

  return {
    name: 'vite-plugin-solidYaml',
    transform: transformer
   }
}