
import { useDraggable } from "@dnd-kit/core";

import ChartCard from "./ChartCard";
import type { Song } from "../../types/song";



interface Props {

    song:Song;

}



function SortableChartCard({

    song

}:Props){

    const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
    } = useDraggable({
        id: song.title,
    });

    const style={
        transform:
            transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
    <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
    >
        <ChartCard song={song} />
    </div>
);

}


export default SortableChartCard;