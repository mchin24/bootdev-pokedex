// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  try {
    const resp = await startREPL(initState());
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();