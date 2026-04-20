import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./Router";
import userDataObject from "./utils/userDataObject.js";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Make user data object globally available for your access
window.userDataObject = userDataObject;

app.mount("#app");
