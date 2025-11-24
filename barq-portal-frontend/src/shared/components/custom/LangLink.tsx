import { Link } from "react-router";
import { useLang } from "@/shared/hooks/use-lang";

export const LangLink = ({
  to,
  children,
  ...props
}: {
  to: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>) => {
  const { lang } = useLang();
  return (
    <Link to={`/${lang}${to}`} {...props}>
      {children}
    </Link>
  );
};
