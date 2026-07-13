import { useDroppable } from "@dnd-kit/core";

import type { Tier } from "../../types/Tier";
import type { Song } from "../../types/song";
import { songs } from "../../data/songs";
import SortableChartCard from "../ChartCard/SortableChartCard";


interface Props {

    tier: Tier;

    songs: Song[];

}



function TierDropArea({

    tier

}: Props) {


    const {
        setNodeRef

    } = useDroppable({

        id:tier.id,

    });



    return (

        <div

            ref={setNodeRef}

            className="tier-content"

        >

            {
            tier.songs.map(id => {


                const song = songs.find(
                    s => s.title === id
                );


                if(!song)
                    return null;


                return (

                    <SortableChartCard

                        key={song.title}

                        song={song}

                    />

                );

            })
        }


        </div>

    );

}


export default TierDropArea;