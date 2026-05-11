export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const resp = await fetch(`${PokeAPI.baseURL}/location-area/${pageURL ? `?offset=${pageURL}` : ""}`);
    if (!resp.ok) {
      throw new Error(`Failed to fetch locations: ${resp.status} ${resp.statusText}`);
    }
    const data = await resp.json();
    return data as ShallowLocations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const resp = await fetch(`${PokeAPI.baseURL}/location/${locationName}`);
    return resp.json() as Promise<Location>;
  }
}

export type ShallowLocations = {
  "count": number,
  "next": string,
  "results": Location[]
};

export type Location = {
  "id": number,
  "name": string,
  "url": string
};