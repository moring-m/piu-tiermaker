import "./SongPool.css";

import { useDroppable } from "@dnd-kit/core";
import type { Song } from "../../types/song";
import {
    SortableContext,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableChartCard from "../ChartCard/SortableChartCard";

interface Props {

    songs: Song[];

}

function SongPool({
    songs
}: Props) {
    const { setNodeRef } = useDroppable({ id:"song-pool", });

    return (

        <div
            ref={setNodeRef}
            className="song-pool"
        >

            

            <SortableContext

                items={songs.map(song => song.title)}

                strategy={rectSortingStrategy}

            >

                {songs.map(song => (

                    <SortableChartCard

                        key={song.title}

                        song={song}

                    />

                ))}

            </SortableContext>

        </div>

    );

}


export default SongPool;