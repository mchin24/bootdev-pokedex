import { StatementSync } from "node:sqlite";
import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private locationCache = new Cache(3000 * 60); // 3 min cache

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;
    // check cache first
    const cacheEntry = this.locationCache.get<ShallowLocations>(url);
    if(cacheEntry) {
      console.log("Cache hit for locations");
      return cacheEntry;
    }

    const resp = await fetch(url);
    if (!resp.ok) {
      console.log(`${PokeAPI.baseURL}/location-area/}`);
      throw new Error(`Failed to fetch locations: ${resp.status} ${resp.statusText}`);
    }
    const data: ShallowLocations = await resp.json();

    // cache results for next time
    this.locationCache.add(url, data);
  
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // check cache first
    const cacheEntry = this.locationCache.get<Location>(locationName);
    if(cacheEntry) {
      return cacheEntry;
    }

    const resp = await fetch(`${PokeAPI.baseURL}/location/${locationName}`);
    if (!resp.ok) {
      throw new Error(`Failed to fetch location: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();
    const location: Location = {id: data.id, name: data.name, url: data.url}

    // cache results for next time
    this.locationCache.add(locationName, location);
    return location;
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