import { useLang } from "./shared/hooks/use-lang";
import { client } from "./sdk";
import { Outlet } from "react-router";

export const LanguageIndex = () => {
  const { lang } = useLang();
  client.interceptors.request.use((config) => {
    config.headers.set("Accept-Language", lang);
    return config;
  });
  return <Outlet />;
};
