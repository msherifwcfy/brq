import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon, SearchIcon, XIcon } from "lucide-react";
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
import { Badge } from "@/shared/components/ui/badge";
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
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string | string[];
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
  multiple?: boolean;
  maxDisplayItems?: number;
  closeOnSelect?: boolean;
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
      multiple = false,
      maxDisplayItems = 2,
      closeOnSelect = true,
    },
    ref
  ) => {
    const { t } = useLang();
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState("");
    const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Normalize value to array for multiselect, string for single select
    const selectedValues = React.useMemo(() => {
      if (multiple) {
        if (Array.isArray(value)) return value;
        if (value) return [value];
        return [];
      }
      return value ? [value] : [];
    }, [value, multiple]);

    const isSelected = React.useCallback(
      (itemId: string | number) => {
        return selectedValues.includes(itemId.toString());
      },
      [selectedValues]
    );

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

    const selectedItems = React.useMemo(() => {
      if (multiple) {
        return items.filter((item) =>
          selectedValues.includes(item[idKey].toString())
        );
      }
      const selectedValue = Array.isArray(value) ? value[0] : value;
      return selectedValue
        ? items.filter((item) => item[idKey].toString() === selectedValue)
        : [];
    }, [value, items, idKey, multiple, selectedValues]);

    const selectedItem = React.useMemo(() => {
      if (multiple) return null;
      const selectedValue = Array.isArray(value) ? value[0] : value;
      if (!selectedValue) return null;
      return items.find((item) => item[idKey].toString() === selectedValue);
    }, [value, items, idKey, multiple]);

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

    const handleSelect = React.useCallback(
      (selectedValue: string) => {
        if (multiple) {
          const currentValues = Array.isArray(value) ? value : value ? [value] : [];
          const isCurrentlySelected = currentValues.includes(selectedValue);
          const newValues = isCurrentlySelected
            ? currentValues.filter((v) => v !== selectedValue)
            : [...currentValues, selectedValue];
          onValueChange?.(newValues);

          // Close popover only if:
          // 1. closeOnSelect is true AND
          // 2. We're adding a new item (not removing)
          if (closeOnSelect && !isCurrentlySelected) {
            setOpen(false);
            setSearchQuery("");
            setDebouncedSearchQuery("");
            if (onSearchChange) {
              onSearchChange("");
            }
          }
          // Otherwise keep it open (either closeOnSelect is false, or we're removing an item)
        } else {
          onValueChange?.(selectedValue);
          setOpen(false);
          setSearchQuery("");
          setDebouncedSearchQuery("");
          if (onSearchChange) {
            onSearchChange("");
          }
        }
      },
      [multiple, value, onValueChange, closeOnSelect, onSearchChange]
    );

    const handleRemoveItem = React.useCallback(
      (e: React.MouseEvent, itemId: string) => {
        e.stopPropagation();
        if (multiple) {
          const currentValues = Array.isArray(value) ? value : value ? [value] : [];
          const newValues = currentValues.filter((v) => v !== itemId);
          onValueChange?.(newValues);
        }
      },
      [multiple, value, onValueChange]
    );

    const getDisplayContent = () => {
      if (multiple) {
        if (selectedItems.length === 0) {
          return <span className="text-muted-foreground">{placeholder || t("common.select")}</span>;
        }

        if (selectedItems.length <= maxDisplayItems) {
          return (
            <div className="flex flex-wrap items-center gap-1 flex-1 min-w-0">
              {selectedItems.map((item) => (
                <Badge
                  key={item[idKey]}
                  variant="secondary"
                  className="text-xs max-w-[200px]"
                >
                  <span className="truncate">{item[labelKey]}</span>
                  <button
                    type="button"
                    onClick={(e) => handleRemoveItem(e, item[idKey].toString())}
                    className="ml-1 rounded-full hover:bg-secondary-foreground/20 p-0.5"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          );
        }

        const visibleItems = selectedItems.slice(0, maxDisplayItems);
        const remainingCount = selectedItems.length - maxDisplayItems;

        return (
          <div className="flex flex-wrap items-center gap-1 flex-1 min-w-0">
            {visibleItems.map((item) => (
              <Badge
                key={item[idKey]}
                variant="secondary"
                className="text-xs max-w-[200px]"
              >
                <span className="truncate">{item[labelKey]}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveItem(e, item[idKey].toString())}
                  className="ml-1 rounded-full hover:bg-secondary-foreground/20 p-0.5"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Badge variant="secondary" className="text-xs">
              +{remainingCount} {t("common.more") || "more"}
            </Badge>
          </div>
        );
      }

      return (
        <span className="truncate">
          {selectedItem
            ? selectedItem[labelKey]
            : placeholder || t("common.select")}
        </span>
      );
    };

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
            <div
              className={cn(
                "flex-1 text-start min-w-0",
                multiple && "flex flex-wrap items-center gap-1",
                !multiple && "truncate",
                textClassName
              )}
            >
              {getDisplayContent()}
            </div>
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
                  {filteredItems.map((item) => {
                    const itemId = item[idKey].toString();
                    const itemIsSelected = isSelected(item[idKey]);

                    return (
                      <CommandItem
                        key={item[idKey]}
                        value={itemId}
                        onSelect={handleSelect}
                        aria-selected={itemIsSelected}
                        disabled={itemDisabled?.(item)}
                        data-disabled={itemDisabled?.(item)}
                        className={cn(
                          itemIsSelected && multiple && "bg-accent"
                        )}
                      >
                        {multiple && (
                          <div className="flex items-center justify-center w-4 h-4 mr-2 shrink-0">
                            {itemIsSelected ? (
                              <CheckIcon className="h-4 w-4 text-primary" />
                            ) : (
                              <div className="w-4 h-4 border border-input rounded-sm" />
                            )}
                          </div>
                        )}
                        {item.tooltip ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="w-full justify-start text-start">
                                {renderItem ? renderItem(item) : item[labelKey]}
                              </TooltipTrigger>
                              <TooltipContent>{item.tooltip}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <>{renderItem ? renderItem(item) : item[labelKey]}</>
                        )}
                      </CommandItem>
                    );
                  })}
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
