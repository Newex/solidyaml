# SolidYaml

## What is it?
This is a `Vite` plugin that enables to include yaml files in the source code.  
The package includes a CLI executable that creates typescript definition files for a given yaml file.  
This definition file conforms to the solidyaml convertion code.

## How to install
Run the following:

```console
$ npm install -D @opensource/solidyaml
```

Add the plugin into the `Vite` config:

```typescript
// vite.config.ts
import solidYaml from "@opensource/solidyaml";

export default defineConfig({
  plugins: [solidYaml()]
})
```

## How to use
You can now import yaml files into your code, example using svelte:

Given a single document yaml file:

```yaml
# $lib/assets/my.yaml
hello: World!
text: |
    Lorem ipsum
    A newline
```

In a svelte component:

```html
// my-component.svelte
<script lang="ts">
  import myAsset from "$lib/assets/my.yaml";
</script>

<!-- Prints out: "World!" -->
console.log(myAsset.hello);
```

## Add intellisense and remove error

To remove error `TS2307` you can create and add definition files.

### Add definition files
Open the command line and navigate to the yaml file.

``` bash
$ cd ./assets
$ npx solidyaml my.yaml
$ # output: my.yaml.d.ts
```

A new file will be created in the current directory: `my.yaml.d.ts`.

Reference this definition file in your `tsconfig.json`

``` typescript
// tsconfig.json
{
    ..."compilerOptions": {
        "types": [
            "./assets/my.yaml.d.ts"
        ]
    }
}
```

# Usage

## Single format yaml document
Another way to import values from a yaml file IF the yaml is a single document is:

```typescript
import yaml, { hello, text } from "$lib/assets/my.yaml";

// prints: "World!"
console.log(hello)
console.log(yaml.hello);

// prints: "Lorem ipsum\nA newline"
console.log(text);
console.log(yaml.text);

```

**Note**  
If the yaml file contains invalid javascript characters for naming variables, the characters will be converted to underscore `_`.  
If the yaml file contains javascript keywords for naming variables or properties, they will be prefixed with dollar sign `$`.

Example, given the single document yaml file:  

```yaml
# invalid.yaml
new: js-keyword
name-with-dashes: invalid variable name.
property-name: invalid variable name but this is allowed for an object property name.
```

```typescript
import yaml, { $new, name_with_dashes } from "invalid.yaml";

// Access through property is OK. NOT renamed.
console.log(yaml.new);
console.log(yaml["name-with-dashes"]);

// Access through variable -> renamed keyword with prefixed
console.log($new);

// variable with illegal chars --> replaced chars with underscore
console.log(name_with_dashes);
```


## Multidocument yaml
Given the yaml file:
```yaml
# File: multi.yaml
# First document
multi: pass
---
# ^-- separator must have 3 dashes
# Second document
other: document
```

You can import the yaml like so:

```typescript
import yaml from "$lib/assets/multi.yaml";

// Prints: "pass"
console.log(yaml[0].multi);

// Prints: "document"
console.log(yaml[1].other);
```

# CLI

You can use the CLI if you have installed the `solidyaml` package.

```bash
$ npx solidyaml [yaml-file] -o /output/directory
```

If you provide the argument `-o /path/to/output/folder` the generated `.d.ts` file will be placed in that directory.  
If no argument to `-o` is provided, the file will be created in the same directory as the yaml file.

The output overwrites any previous file with the same name.  
The output is named using the following rule: `[yaml-filename].d.ts` e.g. `my.yaml.d.ts`


# How does it work?
The plugin looks for an import statement that references an item which ends in either `.yml` or `.yaml`.  
It then adds code to the `Vite` pipeline that resolves the import that converts the yaml to a javascrip object (which is converted from the yaml file).

Both the CLI and the `Vite` plugin use the same converter.  
The CLI uses the generated code in memory and creates type definitions using `ts-morph` package.


# What is a single document YAML?
There are 2 types of yaml files, `single` format and `multidocument` format.

A `multidocument` yaml file contains a `---` separator that separates each document:

```yaml
# File: multi.yaml
# First document
multi: pass
---
# ^-- separator must have 3 dashes
# Second document
other: document
```

A single yaml document can start with 3 dashes:

```yaml
---
# This file start with 3 dashes and does not contain any other documents.
# So this file is a single document yaml
example: file
```