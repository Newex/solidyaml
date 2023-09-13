declare module '*.yaml' {
  export interface JsonType {
    [index: string]: string | JsonType
  }

  const value: JsonType;
  export default value;
}
declare module '*.yml' {
  export interface JsonType {
    [index: string]: string | JsonType
  }

  const value: JsonType;
  export default value;
}