import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import { generateClasses } from "@formkit/tailwindcss";

import "./style.css";

const textStyle = {
  label: "block text-sm font-medium text-gray-700 formkit-invalid:text-red-500",
  inner: "mt-1",
  input:
    "placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full text-base border-gray-300 formkit-invalid:ring-red-500 formkit-invalid:border-red-500 rounded-md transition-colors",
  help: "text-xs text-gray-500",
  messages: "list-none p-0 mt-1 mb-0",
  message: "text-red-500 mb-1 text-xs",
};

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(
  plugin,
  defaultConfig({
    config: {
      classes: generateClasses({
        text: {
          ...textStyle,
        },
        email: {
          ...textStyle,
        },
      }) as any,
    },
  })
);
app.mount("#app");
