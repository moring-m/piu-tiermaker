import type { Tier } from "../types/Tier";


const STORAGE_KEY = "piu-tier-maker";


export function saveTiers(tiers: Tier[]) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tiers)
    );

}



export function loadTiers(): Tier[] | null {

    const data = localStorage.getItem(
        STORAGE_KEY
    );


    if (!data) {

        return null;

    }


    return JSON.parse(data);

}