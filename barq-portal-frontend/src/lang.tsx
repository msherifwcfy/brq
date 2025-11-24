import { redirect, type LoaderFunctionArgs } from "react-router";

import { extractLang } from "./shared/lib/extract-lang";

const languageLoader = ({ request }: LoaderFunctionArgs) => {
  const { lang, t, redirectTo } = extractLang(request);
  if (redirectTo) {
    return redirect(redirectTo);
  }
  document.documentElement.setAttribute("lang", lang);

  return { lang, t };
};
export { languageLoader };
