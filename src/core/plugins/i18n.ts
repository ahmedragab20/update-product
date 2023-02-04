import { createI18n } from "vue-i18n";
import arJO from "@/Localizations/ar-JO";
import enUS from "@/Localizations/en-US";

const messages = {
  en: enUS,
  ar: arJO,
};
const i18n = createI18n({
  legacy: false,
  locale: "en",
  globalInjection: true,
  messages,
});

export default i18n;
