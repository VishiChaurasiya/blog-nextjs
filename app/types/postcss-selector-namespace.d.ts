// postcss-selector-namespace.d.ts
declare module "postcss-selector-namespace" {
  import { Plugin } from "postcss";

  interface Options {
    namespace: string;
  }

  const selectorNamespace: Plugin<Options>;

  export = selectorNamespace;
}
