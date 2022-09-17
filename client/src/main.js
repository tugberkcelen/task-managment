import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.scss";
import "../public/fontawesome5/css/all.min.css";
import i18n from "./plugins/i18n";
import dayjs from "dayjs";

const app = createApp(App);

const opt = {
  themes: {
    light: {
      primary: "#de2a1b",
      secondary: "#1a2f4e",
      borderColor: "#f2f2f2",
      appBg: "#f4f5f5",

      errorRgb: "#ffe0e3",
      error: "#ff4858",

      successRgb: "#c3f3d7",
      success: "#41ba73",

      informationRgb: "#4a8cff1f",
      information: "#4a8cff",

      warningRgb: "#fef7ea",
      warning: "#ee9500",
    },
  },
};

app.config.globalProperties.$opt = opt;
app.config.globalProperties.$dayjs = dayjs;

app.use(router);
app.use(i18n);
app.mount("#app");
