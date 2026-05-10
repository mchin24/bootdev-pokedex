import type { State} from "./state.js";

export function cleanInput(input: string): string[] {
    const cleaned = input.trim().toLowerCase().split(/\s+/);
    return cleaned;
}


export function startREPL(state: State) {
    state.readline.prompt();
    state.readline.on("line", (line) => {
        const cleanedInput = cleanInput(line);
        if (cleanedInput.length === 0) {
            state.readline.prompt();
            return;
        }
        const command = cleanedInput[0];
        const commands = state.commands;
        if (command in commands) {
            commands[command].callback(state);
        } else {
            console.log('Unknown command');
        }
        
        state.readline.prompt();
    });
}