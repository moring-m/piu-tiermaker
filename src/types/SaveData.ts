import type { HeaderInfo } from "./HeaderInfo";
import type { ChartMode } from "./ChartMode";
import type { Tier } from "./Tier";

export interface SaveData {

    version: number;

    header: HeaderInfo;

    filter: {

        mode: ChartMode;

        level: number;

    };

    tiers: Tier[];

}