import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./commands/commands.js";
import { PokeAPI } from "./pokemon.js";

export type State = {
    commands: Record<string, CLICommand>;
    readline: Interface;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
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
        pokeAPI: new PokeAPI,
        nextLocationsURL: null,
        prevLocationsURL: null
    }
}