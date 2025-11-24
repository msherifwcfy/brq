import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { useLang } from "@/shared/hooks/use-lang";
import { cn } from "@/shared/lib/utils";
import { Loader } from "./Loader";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => {
  const { lang } = useLang();
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-radius bg-popover text-popover-foreground",
        className
      )}
      dir={lang === "ar" ? "rtl" : "ltr"}
      {...props}
    />
  );
});
Command.displayName = CommandPrimitive.displayName;

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const { t } = useLang();

  return (
    <div className="flex items-center border-b px-3" data-cmdk-input-wrapper="">
      <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        placeholder={props.placeholder || t("common.search")}
        {...props}
      />
    </div>
  );
});
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => {
  const { t } = useLang();
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className="py-6 text-center text-sm"
      {...props}
    >
      {props.children || t("common.noResultsFound")}
    </CommandPrimitive.Empty>
  );
});
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50 hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      <span className="flex flex-1 items-center gap-2">{children}</span>
    </CommandPrimitive.Item>
  );
});
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandLoading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { t } = useLang();
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-2 py-6", className)}
      {...props}
    >
      <Loader />
      <span>{props.children || t("common.loading")}</span>
    </div>
  );
});
CommandLoading.displayName = "CommandLoading";

interface CommandSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  items?: Array<{
    id: string | number;
    label: string;
    tooltip?: string;
    [key: string]: any;
  }>;
  isLoading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  renderItem?: (item: any) => React.ReactNode;
  size?: "sm" | "default";
  idKey?: string;
  labelKey?: string;
  onSearchChange?: (search: string) => void;
  serverSideSearch?: boolean;
  debounceDuration?: number;
  itemDisabled?: (item: any) => boolean;
  textClassName?: string;
}

const CommandSelect = React.forwardRef<HTMLButtonElement, CommandSelectProps>(
  (
    {
      value,
      onValueChange,
      placeholder,
      searchPlaceholder,
      disabled = false,
      className,
      defaultValue,
      items = [],
      isLoading = false,
      emptyMessage,
      loadingMessage,
      renderItem,
      size = "default",
      idKey = "id",
      labelKey = "label",
      onSearchChange,
      serverSideSearch = false,
      debounceDuration = 300,
      itemDisabled,
      textClassName,
    },
    ref
  ) => {
    const { t } = useLang();
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState("");
    const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Handle search query changes with debounce
    const handleSearchChange = React.useCallback(
      (value: string) => {
        setSearchQuery(value);

        // Clear any existing timeout
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }

        // Set a new timeout for the debounced search
        searchTimeoutRef.current = setTimeout(() => {
          setDebouncedSearchQuery(value);
          if (onSearchChange) {
            onSearchChange(value);
          }
        }, debounceDuration);
      },
      [onSearchChange, debounceDuration]
    );

    // Clean up the timeout on unmount
    React.useEffect(() => {
      return () => {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
      };
    }, []);

    const selectedItem = React.useMemo(() => {
      if (!value) return null;
      return items.find((item) => item[idKey].toString() === value);
    }, [value, items, idKey]);

    const filteredItems = React.useMemo(() => {
      // If server-side search is enabled, don't filter locally
      if (serverSideSearch) return items;

      // Otherwise, filter locally
      if (!searchQuery) return items;

      return items.filter((item) =>
        item[labelKey].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [items, searchQuery, labelKey, serverSideSearch]);

    const handleOpenChange = React.useCallback(
      (isOpen: boolean) => {
        setOpen(isOpen);
        // Clear search when closing the popover
        if (!isOpen) {
          setSearchQuery("");
          setDebouncedSearchQuery("");
          if (onSearchChange) {
            onSearchChange("");
          }
        }
      },
      [onSearchChange]
    );

    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            data-state={open ? "open" : "closed"}
            data-size={size}
            disabled={disabled}
            className={cn(
              "border-input rounded-lg w-full data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex items-center justify-between gap-2 rounded-radius border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-12 data-[size=sm]:h-8 overflow-hidden",
              className
            )}
          >
            <span
              className={cn(
                "flex-1 truncate text-start min-w-0",
                textClassName
              )}
            >
              {selectedItem
                ? selectedItem[labelKey]
                : placeholder || t("common.select")}
            </span>
            <SearchIcon className="h-4 w-4 opacity-50 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          onWheel={(e) => {
            e.stopPropagation();
          }}
        >
          <Command shouldFilter={false}>
            <CommandInput
              value={searchQuery}
              onValueChange={handleSearchChange}
              placeholder={searchPlaceholder}
            />
            <CommandList>
              {isLoading ? (
                <CommandLoading>{loadingMessage}</CommandLoading>
              ) : filteredItems.length === 0 ? (
                <CommandEmpty>{emptyMessage}</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredItems.map((item) => (
                    <CommandItem
                      key={item[idKey]}
                      value={item[idKey].toString()}
                      onSelect={(selectedValue) => {
                        onValueChange?.(selectedValue);
                        setOpen(false);
                        setSearchQuery("");
                        setDebouncedSearchQuery("");
                        if (onSearchChange) {
                          onSearchChange("");
                        }
                      }}
                      aria-selected={value === item[idKey].toString()}
                      disabled={itemDisabled?.(item)}
                      data-disabled={itemDisabled?.(item)}
                    >
                      {item.tooltip ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="w-full  justify-start text-start">
                              {renderItem ? renderItem(item) : item[labelKey]}
                            </TooltipTrigger>
                            <TooltipContent>{item.tooltip}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <>{renderItem ? renderItem(item) : item[labelKey]}</>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
CommandSelect.displayName = "CommandSelect";

export {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSelect,
};
