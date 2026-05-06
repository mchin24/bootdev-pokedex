export function cleanInput(input: string): string[] {
    const cleaned = input.trim().toLowerCase().split(/\s+/);
    return cleaned;
}

import { createInterface } from "node:readline";

const replInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex:> "
});

export function startREPL() {
    replInterface.prompt();
    replInterface.on("line", (line) => {
        const cleanedInput = cleanInput(line);
        if (cleanedInput.length === 0) {
            replInterface.prompt();
            return;
        }
        const command = cleanedInput[0];
        console.log(`Your command was: ${command}`);
        replInterface.prompt();
    });
}