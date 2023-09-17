import { Rate } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function buildQueryParams(params: Record<string, string | undefined>) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
            queryParams.append(key, value);
        }
    }
    return queryParams.toString();
}

export function calculateAvarageRate(rates: Rate[]) {
    if (rates.length === 0) return 0;
    const sum = rates.reduce((sum, rate) => sum + rate.value, 0);
    const avarage = sum / rates.length;
    return avarage;
}
