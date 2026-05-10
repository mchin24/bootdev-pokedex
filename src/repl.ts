import type { CLICommand, State} from "./state.js";

export function cleanInput(input: string): string[] {
    const cleaned = input.trim().toLowerCase().split(/\s+/);
    return cleaned;
}

import { createInterface } from "node:readline";



export function startREPL(state: State) {
    state.interface.prompt();
    state.interface.on("line", (line) => {
        const cleanedInput = cleanInput(line);
        if (cleanedInput.length === 0) {
            state.interface.prompt();
            return;
        }
        const command = cleanedInput[0];
        const commands = state.commands;
        if (command in commands) {
            commands[command].callback(state);
        } else {
            console.log('Unknown command');
        }
        
        state.interface.prompt();
    });
}