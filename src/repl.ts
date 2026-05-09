import type { CLICommand } from "./commands/command.js";
import { commandHelp } from "./commands/commandHelp.js";
import { commandExit } from "./commands/commandExit.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit
        }
    };
}

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
        const commands = getCommands();
        if (command in commands) {
            commands[command].callback(commands);
        } else {
            console.log('Unknown command');
        }
        
        replInterface.prompt();
    });
}