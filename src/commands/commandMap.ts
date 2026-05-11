import type { State } from "../state.js";

export async function commandMap(state: State) {
    const locations = await state.pokeAPI.fetchLocations();
    console.log(locations);
}  