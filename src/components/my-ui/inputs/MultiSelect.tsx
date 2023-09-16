"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";

type Option = Record<"value" | "label", string>;

type MultiSelectProps = {
    options: Option[];
    onChange: (options: Option[]) => void;
    defaultValue?: Option[];
    canCreate?: boolean;
    placeholder?: string;
};

export function MultiSelect({
    options,
    defaultValue,
    onChange,
    canCreate = true,
    placeholder,
}: MultiSelectProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(options);
    const [openCombobox, setOpenCombobox] = useState(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedValues, setSelectedValues] = useState<Option[]>(
        defaultValue ?? []
    );
    const t = useTranslations("MultiSelect");

    const createOption = (name: string) => {
        const newOption = {
            value: name.toLowerCase(),
            label: name,
        };
        setSelectedOptions((prev) => [...prev, newOption]);
        const newValues = [...selectedValues, newOption];
        setSelectedValues(newValues);
        onChange(newValues);
    };

    const toggleOption = (option: Option) => {
        const newValues = !selectedValues.includes(option)
            ? [...selectedValues, option]
            : selectedValues.filter((l) => l.value !== option.value);
        setSelectedValues(newValues);
        onChange(newValues);
        inputRef?.current?.focus();
    };

    const onComboboxOpenChange = (value: boolean) => {
        inputRef.current?.blur();
        setOpenCombobox(value);
    };

    return (
        <div className="w-full sm:w-[180px]">
            <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCombobox}
                        className="w-full justify-between text-foreground"
                    >
                        <span className="truncate">
                            {selectedValues.length === 0 && placeholder}
                            {selectedValues.length >= 1 &&
                                selectedValues
                                    .map(({ label }) => label)
                                    .join(", ")}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command loop>
                        <CommandInput
                            ref={inputRef}
                            placeholder={t("search")}
                            value={inputValue}
                            onValueChange={setInputValue}
                        />
                        <CommandGroup className="w-full overflow-auto">
                            {selectedOptions.map((option) => {
                                const isActive =
                                    selectedValues.findIndex(
                                        (v) => v.value === option.value
                                    ) > -1;
                                return (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={() => toggleOption(option)}
                                        className="w-full"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                isActive
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        <div className="flex-1">
                                            {option.label}
                                        </div>
                                    </CommandItem>
                                );
                            })}
                            {canCreate && (
                                <CommandItemCreate
                                    onSelect={() => createOption(inputValue)}
                                    {...{
                                        inputValue,
                                        options: selectedOptions,
                                    }}
                                />
                            )}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

const CommandItemCreate = ({
    inputValue,
    options,
    onSelect,
}: {
    inputValue: string;
    options: Option[];
    onSelect: () => void;
}) => {
    const hasNoOption = !options
        .map(({ value }) => value)
        .includes(`${inputValue.toLowerCase()}`);

    const render = inputValue !== "" && hasNoOption;

    if (!render) return null;

    return (
        <CommandItem
            key={`${inputValue}`}
            value={`${inputValue}`}
            className="text-xs text-muted-foreground"
            onSelect={onSelect}
        >
            <div className={cn("mr-2 h-4 w-4")} />
            Create new label &quot;{inputValue}&quot;
        </CommandItem>
    );
};
