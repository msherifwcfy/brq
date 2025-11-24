import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";
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

interface HighlightCard {
  id: string;
  title_en: string;
  title_ar: string;
  card_type: string;
  display_order: number;
}

export default function AcademyHighlightCardsSection() {
  const [cards, setCards] = useState<HighlightCard[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<HighlightCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      toast.success("Highlight card created successfully");
      setIsCreateOpen(false);
      loadCards();
    } catch (error: any) {
      toast.error(error.message || "Failed to create highlight card");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (values: CreateAcademyHighlightCardFormData) => {
    setIsLoading(true);
    try {
      console.log("Updating card:", values);
      toast.success("Highlight card updated successfully");
      setIsEditOpen(false);
      setSelectedCard(null);
      loadCards();
    } catch (error: any) {
      toast.error(error.message || "Failed to update highlight card");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCard) return;
    setIsLoading(true);
    try {
      console.log("Deleting card:", selectedCard.id);
      toast.success("Highlight card deleted successfully");
      setIsDeleteOpen(false);
      setSelectedCard(null);
      loadCards();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete highlight card");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Manage highlight cards with statistics for different programs
        </p>
        <Button size="sm" onClick={() => setIsCreateOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No highlight cards yet. Click "Add Card" to create one.</p>
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
                  <p className="text-sm text-gray-500 capitalize">{card.card_type}</p>
                  <p className="text-xs text-gray-400 mt-1">Order: {card.display_order}</p>
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
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCard(card);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-500 mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="font-semibold mb-2">Highlight Card Types:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Internships:</strong> Programs, Graduates, Hiring Rate</li>
          <li><strong>Trainings:</strong> Hours Avg/Staff, Hours in 2023</li>
          <li><strong>Seminars:</strong> Programs, Graduates, Hiring Rate</li>
          <li><strong>Graduates:</strong> Graduates Since Inception</li>
        </ul>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Highlight Card</DialogTitle>
          </DialogHeader>
          <AcademyHighlightCardForm
            onSubmit={handleCreate}
            isLoading={isLoading}
            submitLabel="Create"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Highlight Card</DialogTitle>
          </DialogHeader>
          <AcademyHighlightCardForm
            onSubmit={handleEdit}
            isLoading={isLoading}
            submitLabel="Update"
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the highlight card.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
