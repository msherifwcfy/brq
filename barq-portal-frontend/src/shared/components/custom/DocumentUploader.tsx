import { FileText, X } from "lucide-react";
import React, { useCallback, useState, type ComponentProps } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { cn } from "@/shared/lib/utils";
import type { DocumentType } from "@/shared/schemas/file.schema";
import { Button } from "@/shared/components/ui/button";
import { BASE_URL } from "@/shared/utils/env";
import { Loader } from "./Loader";
import { DocumentPreviewer } from "../ui/document-previewer";

export interface DocumentUploadValue extends DocumentType {
  name?: string;
}

export interface DocumentUploaderProps {
  value?: DocumentUploadValue[];
  onChange?: (value: DocumentUploadValue[] | undefined) => void;
  className?: string;
  maxSize?: number;
  acceptedFileTypes?: string[];
  uploadDocument?: (file: File) => Promise<DocumentUploadValue>;
  placeholder?: string;
  supportingText?: string;
  multiple?: boolean;
  maxDocuments?: number;
  layout?: "grid" | "single";
  showPreview?: boolean;
  disabled?: boolean;
}

const FileIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.8733 5.63107L5.87352 5.71913C4.81267 5.72497 3.79759 6.15199 3.05158 6.90626C2.30558 7.66052 1.88976 8.68024 1.8956 9.74109L2.00568 29.7408M2.00568 29.7408L2.0277 33.7407C2.03354 34.8016 2.46056 35.8167 3.21482 36.5627C3.96908 37.3087 4.9888 37.7245 6.04965 37.7186L30.0493 37.5865C31.1101 37.5807 32.1252 37.1537 32.8712 36.3994C33.6172 35.6452 34.0331 34.6254 34.0272 33.5646L33.9832 25.5647M2.00568 29.7408L11.1271 20.5184C11.873 19.7644 12.8879 19.3376 13.9486 19.3317C15.0092 19.3259 16.0287 19.7416 16.783 20.4873L21.9834 25.6308M33.9391 17.5648L33.9832 25.5647M33.9832 25.5647L30.7938 22.4102C30.0395 21.6645 29.02 21.2488 27.9594 21.2547C26.8987 21.2605 25.8838 21.6873 25.1379 22.4414L21.9834 25.6308M21.9834 25.6308L26.0053 29.6087M29.8732 5.58703L37.873 5.543M33.8511 1.56508L33.8951 9.56495M21.9173 13.6309L21.9373 13.6308"
        stroke="#9CA3AF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const DocumentUploader = ({
  value = [],
  onChange,
  className,
  maxSize = 10 * 1024 * 1024,
  acceptedFileTypes = ["application/pdf", "image/jpeg", "image/*"],
  uploadDocument,
  placeholder,
  supportingText,
  multiple = false,
  maxDocuments = 5,
  layout = "grid",
  showPreview = true,
  disabled = false,
}: DocumentUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewDocument, setPreviewDocument] =
    useState<DocumentUploadValue | null>(null);
  const { t } = useLang();

  const getFileIcon = (type: string, name: string) => {
    if (type?.includes("pdf") || name?.toLowerCase().endsWith(".pdf")) {
      return (
        <FileText className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-red-500" />
      );
    }
    if (
      type?.includes("word") ||
      type?.includes("document") ||
      name?.toLowerCase().endsWith(".doc") ||
      name?.toLowerCase().endsWith(".docx")
    ) {
      return (
        <FileText className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-blue-500" />
      );
    }
    if (type?.includes("image")) {
      return (
        <FileText className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-green-500" />
      );
    }
    return (
      <FileText className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-gray-500" />
    );
  };

  const isImageFile = (format: string) => {
    return (
      format?.includes("png") ||
      format?.includes("jpg") ||
      format?.includes("jpeg") ||
      format?.includes("gif")
    );
  };

  const handleFileUpload = useCallback(
    async (file: File): Promise<DocumentUploadValue> => {
      if (uploadDocument) {
        return await uploadDocument(file);
      } else {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch(`${BASE_URL}media/upload`, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(
              `Upload failed: ${response.status} ${response.statusText}`
            );
          }

          const result = await response.json();
          const mediaData = result.data || result;

          return {
            id: mediaData.id,
            url: mediaData.url,
            key: mediaData.key,
            name: file.name,
            format: mediaData.format,
            mime_type: mediaData.mime_type,
            size: file.size,
          };
        } catch (error) {
          console.error("File upload failed:", error);
          throw error;
        }
      }
    },
    [uploadDocument]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      if (
        multiple &&
        value &&
        value.length + acceptedFiles.length > maxDocuments
      ) {
        toast.error(
          t("components.documentUploader.maxDocumentsReached", {
            maxDocuments,
          })
        );
        return;
      }

      setError(null);
      setIsUploading(true);

      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          return await handleFileUpload(file);
        });

        const results = await Promise.all(uploadPromises);

        if (multiple) {
          onChange?.([...(value || []), ...results]);
        } else {
          onChange?.(results.length ? results : []);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : t("components.documentUploader.uploadFailed");
        toast.error(errorMessage);
        console.error("Upload error:", err);
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, multiple, value, maxDocuments, t, handleFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach((file) => {
        if (file.errors.some((error) => error.code === "file-too-large")) {
          toast.error(
            t("components.documentUploader.fileSizeExceeded", {
              fileName: file.file.name,
              maxSize: maxSize / (1024 * 1024),
            })
          );
        }
        if (file.errors.some((error) => error.code === "file-invalid-type")) {
          toast.error(
            t("components.documentUploader.fileTypeNotSupported", {
              fileType: file.file.type || file.file.name.split(".").pop(),
            })
          );
        }
      });
    },
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    maxFiles: multiple ? maxDocuments - (value?.length || 0) : 1,
    disabled:
      isUploading || (multiple && value && value.length >= maxDocuments),
  });

  const handleRemove = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();

    if (multiple && value) {
      const newValue = [...value];
      newValue.splice(index, 1);
      onChange?.(newValue.length > 0 ? newValue : []);
    } else {
      onChange?.([]);
    }

    setError(null);
  };

  const handleView = (doc: DocumentUploadValue) => {
    setPreviewDocument(doc);
  };

  const renderUploadZone = () => (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-border transition-colors duration-300",
        // Responsive padding
        "px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 lg:px-4 lg:py-4 xl:px-5 xl:py-5",
        layout === "grid" && value && value.length > 0
          ? "h-full aspect-square"
          : "min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[140px] xl:min-h-[160px]",
        layout === "grid" && value && value.length >= 4 && "gap-0 p-2 sm:p-3",
        isDragActive
          ? "border-primary bg-primary/5"
          : "hover:border-primary/50",
        isUploading && "opacity-60 cursor-not-allowed",
        multiple &&
          value &&
          value.length >= maxDocuments &&
          "opacity-50 cursor-not-allowed",
        disabled && "cursor-not-allowed pointer-events-none"
      )}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <Loader

        //   ={t("components.documentUploader.uploading")}
        //   className="py-2 sm:py-3 md:py-4"
        />
      ) : (
        <div className="flex flex-col items-center gap-0">
          {value && value.length > 3 ? (
            <div className="flex flex-col items-center gap-0">
              <FileIcon className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-muted-foreground" />
            </div>
          ) : (
            <>
              <FileIcon
                className={cn(
                  "h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-muted-foreground",
                  layout === "grid" &&
                    value &&
                    value.length >= 4 &&
                    "h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-6 lg:w-6 xl:h-7 xl:w-7"
                )}
              />
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-1 mt-1 sm:mt-2 text-center">
                <p className="text-sm sm:text-base text-[#4B5563] font-semibold">
                  {placeholder || t("components.documentUploader.placeholder")}
                </p>
                <Button
                  variant="link"
                  type="button"
                  size={"sm"}
                  className="text-sm sm:text-base font-semibold text-primary px-0 !py-0 h-auto"
                  disabled={
                    isUploading ||
                    (multiple && value && value.length >= maxDocuments)
                  }
                >
                  {t("components.documentUploader.browse")}
                </Button>
              </div>
            </>
          )}

          {!(value?.length > 0) && (
            <p className="text-xs sm:text-sm text-[#6B7280] text-center mt-1 px-2">
              {multiple
                ? `${
                    supportingText ||
                    t("components.documentUploader.supportingText")
                  } (${t("components.documentUploader.documentsCount", {
                    current: value?.length || 0,
                    max: maxDocuments,
                  })})`
                : supportingText ||
                  t("components.documentUploader.supportingText")}
            </p>
          )}
        </div>
      )}
    </div>
  );

  const renderDocumentPreview = (
    document: DocumentUploadValue,
    index: number
  ) => (
    <div
      key={document.id || index}
      className="relative rounded-lg min-w-24 min-h-24 sm:rounded-xl w-full aspect-square overflow-hidden bg-white cursor-pointer hover:shadow-md transition-all duration-200 "
      onClick={() => handleView(document)}
    >
      <div className="absolute inset-0">
        {isImageFile(document.format || "") ? (
          <img
            src={`${document.url}${document.key}`}
            alt={document.name || "Document"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-2 sm:p-3">
            {getFileIcon(document.format || "", document.name || "")}
            <p className="text-xs sm:text-sm text-center mt-1 sm:mt-2 px-1 sm:px-2 text-muted-foreground truncate w-full">
              {document.name || "Document"}
            </p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </div>
      {!disabled && (
        <button
          onClick={(e) => handleRemove(e, index)}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 rounded-full bg-background/90 backdrop-blur-sm p-1.5 sm:p-2 shadow-sm hover:bg-background hover:shadow-md transition-all duration-200 z-10 touch-manipulation"
          type="button"
          aria-label={t("components.documentUploader.removeDocument")}
        >
          <X size={16} className="sm:w-4 sm:h-4 " />
        </button>
      )}
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "grid gap-4 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-10",
          layout === "grid" && value?.length > 0
            ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-8"
            : "grid-cols-1"
        )}
      >
        {value &&
          value?.map((document, index) =>
            renderDocumentPreview(document, index)
          )}

        {(!(value && value?.length > 0) || multiple) &&
          value?.length < maxDocuments && (
            <div
              className={cn(
                "col-span-1 w-full",
                layout === "grid" &&
                  value &&
                  value.length > 0 &&
                  "aspect-square"
              )}
            >
              {renderUploadZone()}
            </div>
          )}
      </div>

      {error && <p className="text-sm text-destructive mt-2 px-1">{error}</p>}

      {/* Document Preview Modal */}
      {previewDocument && (
        <DocumentPreviewer
          documentUrl={`${previewDocument.url}${previewDocument.key}`}
          title={previewDocument.name || "Document Preview"}
          isOpen={!!previewDocument}
          onClose={() => setPreviewDocument(null)}
        />
      )}
    </div>
  );
};
