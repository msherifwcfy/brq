import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import {
  FormLabel,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { toast } from "sonner";
import {
  type CreateAboutUsCoreValueItemFormData,
} from "../schemas/about-us-core-values.schema";
interface CoreValuesCardsManagementProps {
  cards: CreateAboutUsCoreValueItemFormData[];
  onCardsChange: (cards: CreateAboutUsCoreValueItemFormData[]) => void;
  maxCards?: number;
  errors?: any;
}

export default function CoreValuesCardsManagement({
  cards,
  onCardsChange,
  maxCards = 6,
  errors,
}: CoreValuesCardsManagementProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const handleCardUpdate = (index: number, field: keyof CreateAboutUsCoreValueItemFormData, value: any) => {
    const updatedCards = cards.map((card, i) => {
      if (i === index) {
        return {
          ...card,
          [field]: value,
        };
      }
      return card;
    });
    onCardsChange(updatedCards);
  };

  const handleCardDelete = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index).map((card, i) => ({
      ...card,
      order_index: i,
    }));
    onCardsChange(updatedCards);
    toast.success(t("aboutUs.coreValuesSection.cards.messages.deleted"));
  };

  const handleAddCard = () => {
    const newCard: CreateAboutUsCoreValueItemFormData = {
      title: { en: "", ar: "" },
      icon_media: [],
      order_index: cards.length,
    };
    onCardsChange([...cards, newCard]);
  };

  return (
    <div className="space-y-4">
      <div>
        <FormLabel>{t("aboutUs.coreValuesSection.cards.title")}</FormLabel>
        <p className="text-sm text-muted-foreground mt-1">
          {t("aboutUs.coreValuesSection.cards.description", { current: cards.length, max: maxCards })}
        </p>
      </div>

      <I18nFormProvider currentLanguage={currentLanguage}>
        <I18nTabs
          value={currentLanguage}
          onValueChange={setCurrentLanguage}
          className="w-full"
        >
          <div className="space-y-4">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 gap-2 border p-3 rounded-md"
              >
                <I18nTabContent language="en">
                  <div className="space-y-2">
                    <FormLabel>
                      {t("aboutUs.coreValuesSection.cards.form.title")}
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <Input
                      value={card.title?.en || ""}
                      onChange={(e) => handleCardUpdate(idx, "title", {
                        ...card.title,
                        en: e.target.value,
                      })}
                      placeholder={t("aboutUs.coreValuesSection.cards.form.title")}
                      dir="ltr"
                      className={errors?.[idx]?.title?.en ? "border-destructive" : ""}
                    />
                    {errors?.[idx]?.title?.en && (
                      <p className="text-sm text-destructive">
                        {errors[idx]?.title?.en?.message}
                      </p>
                    )}
                  </div>
                </I18nTabContent>
                <I18nTabContent language="ar">
                  <div className="space-y-2">
                    <FormLabel>
                      {t("aboutUs.coreValuesSection.cards.form.title")}
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <Input
                      value={card.title?.ar || ""}
                      onChange={(e) => handleCardUpdate(idx, "title", {
                        ...card.title,
                        ar: e.target.value,
                      })}
                      placeholder={t("aboutUs.coreValuesSection.cards.form.title")}
                      dir="rtl"
                      className={errors?.[idx]?.title?.ar ? "border-destructive" : ""}
                    />
                    {errors?.[idx]?.title?.ar && (
                      <p className="text-sm text-destructive">
                        {errors[idx]?.title?.ar?.message}
                      </p>
                    )}
                  </div>
                </I18nTabContent>
                <div className="space-y-2">
                  <DocumentUploader
                    value={card.icon_media?.map((item) => ({
                      ...item,
                      key: item.key || "",
                      size: item.size || 0,
                      mime_type: item.mime_type || "",
                      format: item.format || "",
                    })) || []}
                    onChange={(val) => {
                      handleCardUpdate(idx, "icon_media", val?.map((item) => ({
                        ...item,
                        key: item.key || "",
                        size: item.size || 0,
                        mime_type: item.mime_type || "",
                        format: item.format || "",
                      })) || []);
                    }}
                    multiple={false}
                    maxDocuments={1}
                    maxSize={5 * 1024 * 1024}
                    acceptedFileTypes={["image/*"]}
                  />
                  {errors?.[idx]?.icon_media && (
                    <p className="text-sm text-destructive">
                      {errors[idx]?.icon_media?.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleCardDelete(idx)}
                  >
                    {t("common.remove")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </I18nTabs>

        <Button
          type="button"
          variant="secondary"
          onClick={handleAddCard}
        >
          {t("common.add")}
        </Button>
      </I18nFormProvider>
    </div>
  );
}
