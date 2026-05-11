import { ShallowLocations } from "../pokemon.js";
import type { State } from "../state.js";

export async function commandMap(state: State) {
    let locations: ShallowLocations;
    if (state.nextLocationsURL) {
       locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    } else {
       locations = await state.pokeAPI.fetchLocations();
    }
    
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for(const location of locations.results) {
        console.log(`${location.name}`);
    }
}  

export async function commandMapb(state: State) {
    let locations: ShallowLocations;
    if (state.prevLocationsURL) {
       locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
       state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;
        for(const location of locations.results) {
            console.log(`${location.name}`);
        }
    } else {
        console.log("you're on the first page")
       //locations = await state.pokeAPI.fetchLocations();
    }
}  