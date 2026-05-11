import { StatementSync } from "node:sqlite";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const resp = await fetch(pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`);
    if (!resp.ok) {
      console.log(`${PokeAPI.baseURL}/location-area/}`);
      throw new Error(`Failed to fetch locations: ${resp.status} ${resp.statusText}`);
    }
    const data = await resp.json();
    
  
    return data as ShallowLocations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const resp = await fetch(`${PokeAPI.baseURL}/location/${locationName}`);
    if (!resp.ok) {
      throw new Error(`Failed to fetch location: ${resp.status} ${resp.statusText}`);
    }
    const location = await resp.json();
    return {id: location.id, name: location.name, url: location.url} as Location;
  }
}

export type ShallowLocations = {
  "count": number,
  "next": string | null,
  "previous": string | null,
  "results": Location[]
};

export type Location = {
  "id": number,
  "name": string,
  "url": string
};