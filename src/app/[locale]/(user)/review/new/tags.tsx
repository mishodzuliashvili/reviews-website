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

type Tag = Record<"value" | "label", string>;

type TagsSelectProps = {
    tags: Tag[];
    onChange: (tags: Tag[]) => void;
    defatulValue?: Tag[];
};

export function TagsSelect({ tags, defatulValue, onChange }: TagsSelectProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const [openCombobox, setOpenCombobox] = useState(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedValues, setSelectedValues] = useState<Tag[]>(
        defatulValue ?? []
    );

    const createTag = (name: string) => {
        const newTag = {
            value: name.toLowerCase(),
            label: name,
        };
        setSelectedTags((prev) => [...prev, newTag]);
        setSelectedValues((prev) => {
            const newValues = [...prev, newTag];
            onChange(newValues);
            return newValues;
        });
    };

    const toggleTag = (tag: Tag) => {
        setSelectedValues((currentTags) => {
            const newValues = !currentTags.includes(tag)
                ? [...currentTags, tag]
                : currentTags.filter((l) => l.value !== tag.value);
            onChange(newValues);
            return newValues;
        });
        inputRef?.current?.focus();
    };

    const onComboboxOpenChange = (value: boolean) => {
        inputRef.current?.blur();
        setOpenCombobox(value);
    };

    return (
        <div className="max-w-[200px]">
            <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCombobox}
                        className="w-[200px] justify-between text-foreground"
                    >
                        <span className="truncate">
                            {selectedValues.length === 0 && "Select labels"}
                            {selectedValues.length >= 1 &&
                                selectedValues
                                    .map(({ label }) => label)
                                    .join(", ")}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command loop>
                        <CommandInput
                            ref={inputRef}
                            placeholder="Search framework..."
                            value={inputValue}
                            onValueChange={setInputValue}
                        />
                        <CommandGroup className="max-h-[145px] overflow-auto">
                            {selectedTags.map((framework) => {
                                const isActive =
                                    selectedValues.findIndex(
                                        (v) => v.value === framework.value
                                    ) > -1;
                                return (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={() => toggleTag(framework)}
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
                                            {framework.label}
                                        </div>
                                    </CommandItem>
                                );
                            })}
                            <CommandItemCreate
                                onSelect={() => createTag(inputValue)}
                                {...{ inputValue, frameworks: selectedTags }}
                            />
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

const CommandItemCreate = ({
    inputValue,
    frameworks,
    onSelect,
}: {
    inputValue: string;
    frameworks: Tag[];
    onSelect: () => void;
}) => {
    const hasNoFramework = !frameworks
        .map(({ value }) => value)
        .includes(`${inputValue.toLowerCase()}`);

    const render = inputValue !== "" && hasNoFramework;

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
