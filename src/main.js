import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import { createPinia } from "pinia";

// We use vue-router@3 to manage the routes
// They are defined in router.js

// createPinia: global state

createApp(App).use(router).use(createPinia()).mount("#app");
