import { parse, parseAllDocuments } from "yaml";

const jsNameRegex = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;

export const sourceGen = (yaml: string): string => {
  let obj = null;
  let source: string = "";
  let isMulti = false;

  try {
    // Single document yaml
    obj = parse(yaml);
    source += objectPropSourceGen(obj);
  } catch (error) {
    // Multi document yaml
    obj = parseAllDocuments(yaml);
    isMulti = true;

    source += "[";
    let tmp = arraySourceGen(obj);
    source += tmp.join(",");
    source += "]";
  }

  let result = "";
  if (isMulti) {
    result += `const yaml = ${source}; `;
  } else {
    result += source;
    result += `const yaml = ${JSON.stringify(obj)}; `;
  }

  result += "export default yaml;";
  return result;
}

const objectPropSourceGen = (obj: Object): string => {
  let source = "";

  let prop: keyof typeof obj;
  for (prop in obj) {
    let value = obj[prop];

    let propName: string = prop;
    if (!jsNameRegex.test(prop)) {
      // replace illegal characters with _underscore_
      propName = prop.replaceAll(/[^_$a-zA-Z\xA0-\uFFFF0-9]/g, "_");
    } 

    // keyword
    if (jsKeywords.find(k => k === propName)) {
      // Add $ to the name to escape keyword
      source += `export const $${propName} = ${JSON.stringify(value)}; `;
    } else {
      source += `export const ${propName} = ${JSON.stringify(value)}; `;
    }
  }

  return source;
}

const arraySourceGen = <T>(docs: T[]) => {
  let result: string[] = [];
  for (let doc of docs) {
    result.push(JSON.stringify(doc));
  }

  return result;
}

// Note: An object can have a keyword as a property name
// source: https://www.w3schools.in/javascript/keywords/
const jsKeywords = [
  "abstract",
  "arguments",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "eval",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
  "class",
  "enum",
  "export",
  "extends",
  "import",
 " super"
]