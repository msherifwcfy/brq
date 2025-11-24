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
import AcademyInternshipProgramForm from "./AcademyInternshipProgramForm";
import { toast } from "sonner";
import type { CreateAcademyInternshipProgramFormData } from "../schemas/academy-internship-program.schema";

interface InternshipProgram {
  id: string;
  title_en: string;
  title_ar: string;
  display_order: number;
}

export default function AcademyInternshipProgramsSection() {
  const [programs, setPrograms] = useState<InternshipProgram[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<InternshipProgram | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    setPrograms([]);
  };

  const handleCreate = async (values: CreateAcademyInternshipProgramFormData) => {
    setIsLoading(true);
    try {
      console.log("Creating program:", values);
      toast.success("Internship program created successfully");
      setIsCreateOpen(false);
      loadPrograms();
    } catch (error: any) {
      toast.error(error.message || "Failed to create internship program");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (values: CreateAcademyInternshipProgramFormData) => {
    setIsLoading(true);
    try {
      console.log("Updating program:", values);
      toast.success("Internship program updated successfully");
      setIsEditOpen(false);
      setSelectedProgram(null);
      loadPrograms();
    } catch (error: any) {
      toast.error(error.message || "Failed to update internship program");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProgram) return;
    setIsLoading(true);
    try {
      console.log("Deleting program:", selectedProgram.id);
      toast.success("Internship program deleted successfully");
      setIsDeleteOpen(false);
      setSelectedProgram(null);
      loadPrograms();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete internship program");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Manage internship program offerings with descriptions and images
        </p>
        <Button size="sm" onClick={() => setIsCreateOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Program
        </Button>
      </div>

      {programs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No internship programs yet. Click "Add Program" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((program) => (
            <div
              key={program.id}
              className="border rounded-lg p-4 hover:border-gray-400 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    #{program.display_order}
                  </span>
                  <h4 className="font-semibold">{program.title_en}</h4>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProgram(program);
                      setIsEditOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProgram(program);
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

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Internship Program</DialogTitle>
          </DialogHeader>
          <AcademyInternshipProgramForm
            onSubmit={handleCreate}
            isLoading={isLoading}
            submitLabel="Create"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Internship Program</DialogTitle>
          </DialogHeader>
          <AcademyInternshipProgramForm
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
              This action cannot be undone. This will permanently delete the internship program.
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
