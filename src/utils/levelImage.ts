
import { ChartModeLabel, type ChartMode } from "../types/ChartMode";

const images = import.meta.glob(
    "../assets/level/*.png",
    {
        eager: true,
        import: "default",
    }
);

export function getLevelImage(
    mode: ChartMode,
    level: number,
): string {

    const path = `../assets/level/${ChartModeLabel[mode]}${level}.png`;

    return images[path] as string;

}