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
import AcademyFoundationTrackForm from "./AcademyFoundationTrackForm";
import { toast } from "sonner";
import type { CreateAcademyFoundationTrackFormData } from "../schemas/academy-foundation-track.schema";

interface FoundationTrack {
  id: string;
  title_en: string;
  title_ar: string;
  display_order: number;
}

export default function AcademyFoundationTracksSection() {
  const [tracks, setTracks] = useState<FoundationTrack[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<FoundationTrack | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    setTracks([]);
  };

  const handleCreate = async (values: CreateAcademyFoundationTrackFormData) => {
    setIsLoading(true);
    try {
      console.log("Creating track:", values);
      toast.success("Foundation track created successfully");
      setIsCreateOpen(false);
      loadTracks();
    } catch (error: any) {
      toast.error(error.message || "Failed to create foundation track");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (values: CreateAcademyFoundationTrackFormData) => {
    setIsLoading(true);
    try {
      console.log("Updating track:", values);
      toast.success("Foundation track updated successfully");
      setIsEditOpen(false);
      setSelectedTrack(null);
      loadTracks();
    } catch (error: any) {
      toast.error(error.message || "Failed to update foundation track");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTrack) return;
    setIsLoading(true);
    try {
      console.log("Deleting track:", selectedTrack.id);
      toast.success("Foundation track deleted successfully");
      setIsDeleteOpen(false);
      setSelectedTrack(null);
      loadTracks();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete foundation track");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Manage foundation track programs offered in the academy
        </p>
        <Button size="sm" onClick={() => setIsCreateOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Track
        </Button>
      </div>

      {tracks.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No foundation tracks yet. Click "Add Track" to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="border rounded-lg p-4 hover:border-gray-400 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Order: {track.display_order}
                    </span>
                    <h4 className="font-semibold text-lg">{track.title_en}</h4>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTrack(track);
                      setIsEditOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTrack(track);
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
            <DialogTitle>Create Foundation Track</DialogTitle>
          </DialogHeader>
          <AcademyFoundationTrackForm
            onSubmit={handleCreate}
            isLoading={isLoading}
            submitLabel="Create"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Foundation Track</DialogTitle>
          </DialogHeader>
          <AcademyFoundationTrackForm
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
              This action cannot be undone. This will permanently delete the foundation track.
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
