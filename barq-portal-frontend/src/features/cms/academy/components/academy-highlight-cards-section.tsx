import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { PlusIcon, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import AcademyHighlightCardForm from "./AcademyHighlightCardForm";
import { toast } from "sonner";
import type { CreateAcademyHighlightCardFormData } from "../schemas/academy-highlight-card.schema";
import { useLang } from "@/shared/hooks/use-lang";

interface HighlightCard {
  id: string;
  title_en: string;
  title_ar: string;
  card_type: string;
  display_order: number;
}

export default function AcademyHighlightCardsSection() {
  const { t } = useLang();
  const [cards, setCards] = useState<HighlightCard[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<HighlightCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const cardTypeLabels: Record<string, string> = {
    internships: t("cms.academy.highlightCards.cardTypes.internships"),
    trainings: t("cms.academy.highlightCards.cardTypes.trainings"),
    seminars: t("cms.academy.highlightCards.cardTypes.seminars"),
    graduates: t("cms.academy.highlightCards.cardTypes.graduates"),
  };

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    setCards([]);
  };

  const handleCreate = async (values: CreateAcademyHighlightCardFormData) => {
    setIsLoading(true);
    try {
      console.log("Creating card:", values);
      toast.success(t("cms.academy.highlightCards.messages.created"));
      setIsCreateOpen(false);
      loadCards();
    } catch (error: any) {
      toast.error(
        error.message || t("cms.academy.highlightCards.messages.createError")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (values: CreateAcademyHighlightCardFormData) => {
    setIsLoading(true);
    try {
      console.log("Updating card:", values);
      toast.success(t("cms.academy.highlightCards.messages.updated"));
      setIsEditOpen(false);
      setSelectedCard(null);
      loadCards();
    } catch (error: any) {
      toast.error(
        error.message || t("cms.academy.highlightCards.messages.updateError")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCard) return;
    setIsLoading(true);
    try {
      console.log("Deleting card:", selectedCard.id);
      toast.success(t("cms.academy.highlightCards.messages.deleted"));
      setIsDeleteOpen(false);
      setSelectedCard(null);
      loadCards();
    } catch (error: any) {
      toast.error(
        error.message || t("cms.academy.highlightCards.messages.deleteError")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {t("cms.academy.highlightCards.description")}
        </p>
        <Button size="sm" onClick={() => setIsCreateOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          {t("cms.academy.highlightCards.add")}
        </Button>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>{t("cms.academy.highlightCards.empty")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border rounded-lg p-4 hover:border-gray-400 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{card.title_en}</h4>
                  <p className="text-sm text-gray-500 capitalize">
                    {cardTypeLabels[card.card_type] || card.card_type}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {t("cms.academy.highlightCards.cards.order", {
                      order: card.display_order,
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCard(card);
                      setIsEditOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedCard(card);
                      setIsDeleteOpen(true);
                    }}
                  >
                    {t('common.delete')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-500 mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="font-semibold mb-2">
          {t("cms.academy.highlightCards.types.title")}
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>{t("cms.academy.highlightCards.types.internships")}</li>
          <li>{t("cms.academy.highlightCards.types.trainings")}</li>
          <li>{t("cms.academy.highlightCards.types.seminars")}</li>
          <li>{t("cms.academy.highlightCards.types.graduates")}</li>
        </ul>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {t("cms.academy.highlightCards.dialog.createTitle")}
            </DialogTitle>
          </DialogHeader>
          <AcademyHighlightCardForm
            onSubmit={handleCreate}
            isLoading={isLoading}
            submitLabel={t("common.create")}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {t("cms.academy.highlightCards.dialog.editTitle")}
            </DialogTitle>
          </DialogHeader>
          <AcademyHighlightCardForm
            onSubmit={handleEdit}
            isLoading={isLoading}
            submitLabel={t("common.update")}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("cms.academy.highlightCards.confirm.title")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("cms.academy.highlightCards.confirm.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
              {isLoading
                ? t("cms.academy.highlightCards.confirm.deleting")
                : t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
