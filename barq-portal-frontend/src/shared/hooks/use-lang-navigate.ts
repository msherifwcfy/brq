import { useNavigate } from "react-router";
import { useLang } from "./use-lang";

export const useLangNavigate = () => {
  const { lang } = useLang();
  const navigate = useNavigate();
  return (path: string) => {
    navigate(`/${lang}${path}`);
  };
};
