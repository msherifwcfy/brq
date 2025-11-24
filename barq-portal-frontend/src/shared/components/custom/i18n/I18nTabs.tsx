import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/components/ui/tabs";
import { useLang } from "@/shared/hooks/use-lang";
import { LANGUAGE_CODES, type LanguageCode } from "../../../constants";
import { type ReactNode } from "react";

interface I18nTabsProps {
  children: ReactNode;
  className?: string;
  value?: LanguageCode;
  onValueChange?: (value: LanguageCode) => void;
}

export function I18nTabs({
  children,
  className,
  value,
  onValueChange,
}: I18nTabsProps) {
  const { t } = useLang();

  return (
    <Tabs
      value={value}
      onValueChange={(value) => onValueChange?.(value as LanguageCode)}
      className={className}
    >
      <TabsList className="grid w-full grid-cols-2">
        {LANGUAGE_CODES.map((lang) => (
          <TabsTrigger key={lang} value={lang}>
            {t(`common.language.${lang}`)}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}

interface I18nTabContentProps {
  language: LanguageCode;
  children: ReactNode;
  className?: string;
}

export function I18nTabContent({
  language,
  children,
  className,
}: I18nTabContentProps) {
  return (
    <TabsContent value={language} className={className}>
      {children}
    </TabsContent>
  );
}
