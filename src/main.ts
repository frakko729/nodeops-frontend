import { Router } from "vue-router";
import { createApp, markRaw } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { plugin as formkitPlugin, defaultConfig } from "@formkit/vue";
import formkitClasses from "./formkit.classes";
import { generateClasses } from "@formkit/tailwindcss";
import "./style.css";

const pinia = createPinia();

/**
 * Make router available inside pinia for redirects and error handling
 */
pinia.use(({ store }) => {
  store.$router = markRaw(router) as Router;
});

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(
  formkitPlugin,
  defaultConfig({
    config: {
      classes: generateClasses(formkitClasses) as any,
    },
  })
);

app.mount("#app");
