import { commandHelp } from "./commandHelp.js";
import { commandExit } from "./commandExit.js";
import { commandMap } from "./commandMap.js";

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
      description: "Displays a list of Pokemon locations, 20 per page.",
      callback: commandMap
    }
  };
}

