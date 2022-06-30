/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface Window {
  // extend the window
  ethereum: any;
}

declare module "d3" {
  import * as d3Types from "@types/d3";
  export = d3Types;
}

declare module "vue-blockies";
declare module "js-cookie";
declare module "prismjs";
declare module "prism-es6";
declare module "tailwind.config.js";
declare module "tailwindcss/resolveConfig";
