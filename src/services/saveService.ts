import type { SaveData } from "../types/SaveData";
import type { HeaderInfo } from "../types/HeaderInfo";
import type { ChartMode } from "../types/ChartMode";
import type { Tier } from "../types/Tier";
import { songs } from "../data/songs";

interface ExportParams {

    header: HeaderInfo;

    filter: {

        mode: ChartMode;

        level: number;

    };

    tiers: Tier[];

}

export function exportTierList({

    header,

    filter,

    tiers,

}: ExportParams): SaveData {

    return {

        version: 1,

        header,

        filter,

        tiers,

    };

}

export function downloadJson(data: SaveData) {

    const json = JSON.stringify(data, null, 4);

    const blob = new Blob(
        [json],
        {
            type: "application/json",
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "tier-list.json";

    link.click();

    URL.revokeObjectURL(url);

}

export async function loadJsonFile(
    file: File,
): Promise<SaveData> {

    const text = await file.text();

    const data = JSON.parse(text) as SaveData;

    data.tiers.forEach(tier => {
        tier.songs = tier.songs.filter(songId =>
            isValidSongForFilter(
                songId,
                data.filter.mode,
                data.filter.level,
            )
        );
    });

    return data;

}

function isValidSongForFilter(
    songId: string,
    mode: ChartMode,
    level: number,
): boolean {
    const song = songs.find(
        song => song.title === songId
    );

    if (!song) {
        return false;
    }

    return song['charts'][mode].includes(level);

}