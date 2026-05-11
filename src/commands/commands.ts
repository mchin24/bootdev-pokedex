import { commandHelp } from "./commandHelp.js";
import { commandExit } from "./commandExit.js";
import { commandMap, commandMapb } from "./commandMap.js";

import type { CLICommand } from "../state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Displays a list ofthe next 20 Pokemon locations.",
      callback: commandMap
    },
    mapb: {
      name: "mapb",
      description: "Displays a list of the previous 20 Pokemon locations.",
      callback: commandMapb
    }
  };
}

