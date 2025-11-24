import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronUp } from "lucide-react";
import * as React from "react";
import { useLang } from "@/shared/hooks/use-lang";
import { cn } from "@/shared/lib/utils";

interface CollapsibleSectionProps
  extends Omit<
    React.ComponentProps<typeof CollapsiblePrimitive.Root>,
    "title"
  > {
  title: string | React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "card";
  defaultOpen?: boolean;
}

function CollapsibleSection({
  title,
  children,
  variant = "default",
  defaultOpen = false,
  className,
  ...props
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const { t, lang } = useLang();

  return (
    <CollapsiblePrimitive.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "rounded-xl",
        variant === "default" && "bg-white p-4 gap-4 flex flex-col",
        variant === "card" && "bg-muted/30 p-4 shadow-sm border",
        lang === "ar" && "rtl",
        className
      )}
      {...props}
    >
      <CollapsiblePrimitive.CollapsibleTrigger
        className={cn(
          "flex items-center justify-between w-full text-start group",
          "focus:outline-none    rounded-lg",
          "hover:bg-muted/20 transition-all duration-200 ease-in-out p-2 -m-2",
          lang === "ar" && "flex-row-reverse"
        )}
        aria-label={
          isOpen
            ? t("components.collapsible.collapse")
            : t("components.collapsible.expand")
        }
      >
        <h3
          className={cn(
            "font-redhat font-semibold text-foreground leading-tight",
            variant === "default" && "text-xl font-bold",
            variant === "card" && "text-lg font-semibold"
          )}
        >
          {title}
        </h3>
        <ChevronUp
          className={cn(
            "h-6 w-6 text-primary transition-all duration-300 ease-in-out shrink-0",
            isOpen ? "rotate-0" : "rotate-180"
          )}
          aria-hidden="true"
        />
      </CollapsiblePrimitive.CollapsibleTrigger>

      <CollapsiblePrimitive.CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out transform",
            "data-[state=closed]:opacity-0 data-[state=closed]:translate-y-[-10px]",
            "data-[state=open]:opacity-100 data-[state=open]:translate-y-0",
            variant === "default" && "pt-3",
            variant === "card" && "pt-2"
          )}
        >
          {children}
        </div>
      </CollapsiblePrimitive.CollapsibleContent>
    </CollapsiblePrimitive.Root>
  );
}

interface CollapsibleGroupProps extends React.ComponentProps<"div"> {
  title: string;
  children: React.ReactNode;
}

function CollapsibleGroup({
  title,
  children,
  className,
  ...props
}: CollapsibleGroupProps) {
  return (
    <div
      className={cn("bg-background rounded-xl p-4 space-y-3", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-redhat font-bold text-xl text-foreground leading-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

interface CollapsibleCardProps
  extends Omit<
    React.ComponentProps<typeof CollapsiblePrimitive.Root>,
    "title"
  > {
  title: string | React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleCard({
  title,
  children,
  defaultOpen = false,
  className,
  ...props
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const { t, lang } = useLang();

  return (
    <CollapsiblePrimitive.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "bg-muted/30 rounded-lg   border border-border/50",
        className
      )}
      {...props}
    >
      <CollapsiblePrimitive.CollapsibleTrigger
        className={cn(
          "flex items-center justify-between w-full px-6 py-4 text-start group",
          "hover:bg-muted/50 transition-all duration-200 ease-in-out",
          "focus:outline-none     rounded-lg"
        )}
        aria-label={
          isOpen
            ? t("components.collapsible.collapse")
            : t("components.collapsible.expand")
        }
      >
        <h3 className="font-redhat font-semibold text-lg w-full text-foreground leading-tight">
          {title}
        </h3>
        <ChevronUp
          className={cn(
            "h-6 w-6 text-primary transition-all duration-300 ease-in-out shrink-0 ml-10",
            isOpen ? "rotate-0" : "rotate-180"
          )}
          aria-hidden="true"
        />
      </CollapsiblePrimitive.CollapsibleTrigger>

      <CollapsiblePrimitive.CollapsibleContent className="overflow-hidden px-4 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className=" py-4 transition-all duration-300 ease-in-out transform data-[state=closed]:opacity-0 data-[state=closed]:translate-y-[-10px] data-[state=open]:opacity-100 data-[state=open]:translate-y-0">
          {children}
        </div>
      </CollapsiblePrimitive.CollapsibleContent>
    </CollapsiblePrimitive.Root>
  );
}

export { CollapsibleCard, CollapsibleGroup, CollapsibleSection };
