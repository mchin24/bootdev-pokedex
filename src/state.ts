import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./commands/commands.js";
import { PokeAPI } from "./pokemon.js";

export type State = {
    commands: Record<string, CLICommand>;
    readline: Interface;
    pokeAPI: PokeAPI;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export function initState(): State {
    const replInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex:> "
    });

    return {
        commands: getCommands(),
        readline: replInterface,
        pokeAPI: new PokeAPI
    }
}