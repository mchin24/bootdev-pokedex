import { createInterface, type Interface } from "node:readline";
import { commandHelp } from "./commands/commandHelp.js";
import { commandExit } from "./commands/commandExit.js";

export type State = {
    commands: Record<string, CLICommand>;
    interface: Interface;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export function initState(): State {
    const commandsRegistry = {
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
    const replInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex:> "
    });

    return {
        commands: commandsRegistry,
        interface: replInterface
    }
}