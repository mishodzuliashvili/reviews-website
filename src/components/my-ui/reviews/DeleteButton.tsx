"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

type DeleteButtonProps = {
    onDelete: () => void;
};

export default function DeleteButton({ onDelete }: DeleteButtonProps) {
    return (
        <Button className="" variant="outline" onClick={onDelete}>
            <RiDeleteBinLine />
        </Button>
    );
}
