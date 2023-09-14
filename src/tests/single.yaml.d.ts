declare module '*single.yaml' {
    export const $this = "first";
    export const second = "other";
    export const newline = "new";
    export const $new = "keyword?";
    const yaml: {
        this: string;
        second: string;
        newline: string;
        new: string;
    };
    export default yaml;
}
