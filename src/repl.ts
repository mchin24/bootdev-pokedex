export function cleanInput(input: string): string[] {
    const cleaned = input.trim().toLowerCase().split(/\s+/);
    return cleaned;
}