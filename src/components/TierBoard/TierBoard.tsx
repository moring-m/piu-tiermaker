import "./TierBoard.css";
import type { Tier } from "../../types/Tier";
import TierDropArea from "./TierDropArea";
import type { Song } from "../../types/song";


interface TierBoardProps {
    tiers: Tier[];
    setTiers: React.Dispatch<React.SetStateAction<Tier[]>>;
    songs: Song[];
    previewMode: boolean;
}


function TierBoard({
    tiers,
    setTiers,
    songs,
    previewMode,
}: TierBoardProps) {


    return (

        <div className="tier-board">
            {
                tiers.filter(tier =>
                        (!previewMode || tier.songs.length > 0)
                    ).map(tier => (

                    <div
                        className="tier-row"
                        key={tier.id}
                        
                    >
                        {!previewMode && (
                            <input className="tier-color-picker"
                                type="color"
                                value={tier.color}
                                onChange={(e) => {

                                    setTiers(prev =>
                                        prev.map(t =>
                                            t.id === tier.id
                                                ? {
                                                    ...t,
                                                    color: e.target.value,
                                                }
                                                : t
                                        )
                                    );

                                }}
                            />
                        )}
                        <div className="tier-name"
                            style={{
                                backgroundColor: tier.color,
                            }}>
                            <input
                                value={tier.name}

                                onChange={(e)=>{


                                    setTiers(prev =>

                                        prev.map(t =>

                                            t.id === tier.id

                                            ? {
                                                ...t,
                                                name:e.target.value
                                            }

                                            : t

                                        )

                                    );


                                }}

                            />
                        </div>

                        <TierDropArea tier={tier} songs={songs}/>

                        {!previewMode && (
                            <button

                                onClick={()=>{


                                    setTiers(prev =>

                                        prev.filter(t => t.id !== tier.id)

                                    );


                                }}

                                style={{
                                    backgroundColor: "#ffbcbc",
                                }}
                            >
                                삭제
                            </button>
                        )}
                    </div>

                ))
            }
            {!previewMode && (
                <button className="tier-add"
                    onClick={()=>{
                        setTiers(prev => [
                            ...prev,
                            {
                                id: crypto.randomUUID(),
                                name:"새 티어",
                                songs:[],
                                color: "#aaaaaa",
                            }
                        ]);
                    }}
                    >
                    티어 추가
                </button>
            )}
        </div>

    );

}


export default TierBoard;