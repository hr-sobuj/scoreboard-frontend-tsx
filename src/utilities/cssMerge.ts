import { twMerge } from 'tailwind-merge';

export function cn(...input: any[]) {
    return twMerge(input);
}