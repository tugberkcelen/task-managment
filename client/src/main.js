import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.scss";
import i18n from "./plugins/i18n";

const app = createApp(App);

const opt = {
  themes: {
    light: {
      primary: "#de2a1b",
      secondary: "#1a2f4e",
      borderColor: "#f2f2f2",
      appBg: "#f4f5f5",
    },
  },
};

app.config.globalProperties.$opt = opt;

app.use(router);
app.use(i18n);
app.mount("#app");
