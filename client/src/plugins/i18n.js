import tr from "../locales/tr.json";
import en from "../locales/en.json";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  messages: {
    tr: tr,
    en: en,
  },
  locale: "tr",
});

export default i18n;
