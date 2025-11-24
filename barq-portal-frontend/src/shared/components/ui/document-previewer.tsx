"use client";

import { FileText } from "lucide-react";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";

interface DocumentPreviewerProps {
  /**
   * URL of the document to preview (PDF or image)
   */
  documentUrl: string;
  /**
   * Title to be displayed in the header
   */
  title?: string;
  /**
   * Optional CSS class name for the container
   */
  className?: string;
  /**
   * Whether the document previewer is open
   */
  isOpen?: boolean;
  /**
   * Callback when the close button is clicked
   */
  onClose?: () => void;
  /**
   * Optional custom header content
   */
  headerContent?: React.ReactNode;
  /**
   * Optional footer content
   */
  footerContent?: React.ReactNode;
  /**
   * Custom trigger element or text
   */
  previewTrigger?: string | React.ReactNode;
  /**
   * Whether to show the default document preview trigger
   */
  showDefaultTrigger?: boolean;
  /**
   * Optional document name for the default trigger
   */
  documentName?: string;
  /**
   * Optional document format/type for determining the icon
   */
  documentFormat?: string;
  /**
   * Optional class name for the trigger
   */
  triggerClassName?: string;
}

function DocumentPreviewer({
  documentUrl,
  title,
  className,
  isOpen,
  onClose,
  headerContent,
  footerContent,
  previewTrigger,
  showDefaultTrigger = false,
  documentName,
  documentFormat,
  triggerClassName,
  ...props
}: DocumentPreviewerProps & React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [internalOpen, setInternalOpen] = React.useState(false);

  const fileFormat = documentUrl?.split(".").pop();

  // Determine if we're using internal state management or external
  const isControlled = isOpen !== undefined && onClose !== undefined;
  const dialogOpen = isControlled ? isOpen : internalOpen;
  const handleDialogChange = React.useCallback(
    (open: boolean) => {
      if (isControlled) {
        if (!open) {
          onClose?.();
        }
      } else {
        setInternalOpen(open);
      }
    },
    [isControlled, onClose]
  );

  // Determine if the document is a PDF
  const isPDF = React.useMemo(() => {
    return documentUrl?.toLowerCase().endsWith(".pdf");
  }, [documentUrl]);

  // Get the appropriate file icon based on type and name
  const getFileIcon = React.useCallback((type: string, name: string) => {
    if (type?.includes("pdf") || name?.toLowerCase().endsWith(".pdf")) {
      return <FileText className="h-16 w-16 text-red-500" />;
    }
    if (
      type?.includes("word") ||
      type?.includes("document") ||
      name?.toLowerCase().endsWith(".doc") ||
      name?.toLowerCase().endsWith(".docx")
    ) {
      return <FileText className="h-16 w-16 text-red-500" />;
    }
    if (type?.includes("image")) {
      return <FileText className="h-16 w-16 text-green-500" />;
    }
    return <FileText className="h-16 w-16 text-red-500" />;
  }, []);

  // Check if the document is an image
  const isImageFile = React.useCallback((format: string) => {
    return (
      format?.includes("png") ||
      format?.includes("jpg") ||
      format?.includes("jpeg") ||
      format?.includes("gif")
    );
  }, []);

  // Handle document load events
  const handleDocumentLoadSuccess = React.useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  const handleDocumentLoadError = React.useCallback(() => {
    setIsLoading(false);
    setError("Failed to load document");
  }, []);

  // Render the default trigger
  const renderDefaultTrigger = () => (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden bg-white cursor-pointer hover:shadow-md transition-shadow aspect-square",
        triggerClassName
      )}
    >
      <div className="absolute inset-0">
        {isImageFile(fileFormat || "") ? (
          <img
            src={documentUrl}
            alt={documentName || "Document"}
            className="w-full h-full aspect-square object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
            {getFileIcon(fileFormat || "", documentName || "")}
            <p className="text-xs text-center mt-2 px-2 text-muted-foreground truncate">
              {documentName || "Document"}
            </p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </div>
    </div>
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
      {(previewTrigger || showDefaultTrigger) && (
        <DialogTrigger asChild>
          {previewTrigger ? (
            typeof previewTrigger === "string" ? (
              <button type="button">{previewTrigger}</button>
            ) : (
              previewTrigger
            )
          ) : showDefaultTrigger ? (
            renderDefaultTrigger()
          ) : null}
        </DialogTrigger>
      )}
      <DialogContent
        className={cn(
          "min-w-[40vw] w-full  max-h-[90vh]  p-0 overflow-hidden",
          className
        )}
        data-slot="document-previewer"
        {...props}
      >
        {/* Header section */}
        {/* <DialogHeader className="px-6 py-6 h-fit flex justify-center items-start border-b bg-neutral-50 border-border">
          <DialogTitle className="text-base font-medium   text-foreground">
            {title || "Document Preview"}
          </DialogTitle>
          {headerContent}
        </DialogHeader> */}

        {/* Content section */}
        <div
          className="flex-1  flex flex-col items-center justify-center p-6 overflow-auto"
          data-slot="document-previewer-content"
        >
          {error && (
            <div className="flex flex-col items-center justify-center text-destructive p-8">
              <span className="text-sm">{error}</span>
            </div>
          )}

          {!error && (
            <>
              {isPDF ? (
                <iframe
                  src={`${documentUrl}#toolbar=0&navpanes=0`}
                  className="w-full h-full border-0 min-h-[60vh]"
                  onLoad={handleDocumentLoadSuccess}
                  onError={handleDocumentLoadError}
                />
              ) : (
                <div className="w-full flex items-center justify-center">
                  <img
                    src={documentUrl}
                    alt="Document preview"
                    className="max-w-full max-h-full object-contain"
                    onLoad={handleDocumentLoadSuccess}
                    onError={handleDocumentLoadError}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer section (optional) */}
        {footerContent && (
          <div
            className="p-4 border-t border-border"
            data-slot="document-previewer-footer"
          >
            {footerContent}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { DocumentPreviewer, type DocumentPreviewerProps };
