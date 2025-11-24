import { useEffect, useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { useLandingNumbersControllerReadQuery } from "@/sdk/modules/landingnumber.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createLandingNumbersSchema,
  updateLandingNumbersSchema,
} from "../schemas/landing-numbers.schema";
import type {
  CreateLandingNumbersFormData,
  UpdateLandingNumbersFormData,
} from "../schemas/landing-numbers.schema";
import { useModal } from "@/shared/store/modal-store";
import { Badge } from "@/shared/components/ui/badge";

export default function HomeLandingNumbersSection() {
  const { lang, t } = useLang();

  const { onOpen } = useModal();

  const { data, isLoading } = useLandingNumbersControllerReadQuery({
    query: {
      query: {
        relations: {
          landing_numbers_id_landing_numbers_translations: true,
        },
      },
    },
  });

  const existing = data?.data?.[0];
  const currentTranslation = useMemo(
    () =>
      existing?.landing_numbers_id_landing_numbers_translations?.find(
        (tr) => tr.language === lang
      ),
    [existing, lang]
  );

  const isUpdate = !!existing;

  type FormData = CreateLandingNumbersFormData | UpdateLandingNumbersFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateLandingNumbersSchema : createLandingNumbersSchema
    ),
    defaultValues: {
      number: 0,
      label: "",
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existing) return;
    form.reset({
      number: existing.number ?? 0,
      label: currentTranslation?.label || existing.label || "",
    } as unknown as FormData);
  }, [existing, currentTranslation, form]);

  if (isLoading) return <div />;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => onOpen("createWhoWeAreStat", {}, () => {})}>
          {t("cms.homePage.whoWeAreStats.create")}
        </Button>
      </div>
      <div className="grid gap-2">
        {(data?.data || []).map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-2xl  p-3"
          >
            <div className="flex items-center gap-4">
              <span>{item.label}</span>
              <Badge variant="default">{item.number}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() =>
                  onOpen(
                    "updateWhoWeAreStat",
                    { id: item.id, number: item.number, label: item.label },
                    () => {}
                  )
                }
              >
                {t("common.edit")}
              </Button>
              <Button
                variant="destructive"
                onClick={() => onOpen("deleteWhoWeAreStat", { id: item.id })}
              >
                {t("common.delete")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
