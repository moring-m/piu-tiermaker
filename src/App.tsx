import { useEffect, useMemo, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import SongPool from "./components/SongPool/SongPool";
import TierBoard from "./components/TierBoard/TierBoard";
import { songs } from "./data/songs";
import type { Tier } from "./types/Tier";
import type { ChartMode } from "./types/ChartMode";
import FilterBar from "./components/FilterBar/FilterBar";
import "./App.css";
import Header from "./components/Header/Header";
import type { HeaderInfo } from "./types/HeaderInfo";
import HeaderEditor from "./components/HeaderEditor/HeaderEditor";
import { useRef } from "react";

function App() {

    const [tiers, setTiers] = useState<Tier[]>([

        {
            id: crypto.randomUUID(),
            name: "최상",
            songs: [],
            color: "#ff3318",
        },

        {
            id: crypto.randomUUID(),
            name: "상",
            songs: [],
            color: "#ff8c00",
        },

        {
            id: crypto.randomUUID(),
            name: "중상",
            songs: [],
            color: "#dcc724",
        },

        {
            id: crypto.randomUUID(),
            name: "중",
            songs: [],
            color: "#2bdc24",
        },

        {
            id: crypto.randomUUID(),
            name: "중하",
            songs: [],
            color: "#24d0dc",
        },

        {
            id: crypto.randomUUID(),
            name: "하",
            songs: [],
            color: "#4166F5",
        },

        {
            id: crypto.randomUUID(),
            name: "최하",
            songs: [],
            color: "#9028ff",
        },

        {
            id: crypto.randomUUID(),
            name: "고유",
            songs: [],
            color: "#9f5d34",
        },

    ]);

    const [tierInfo, setTierInfo] = useState<HeaderInfo>({

        title: "펌프잇업 서열표 제작기",

        subtitle: "이건 부제목입니다",

        creator: "moring",

        version: "1.0.0",

    });

    const [previewMode, setPreviewMode] = useState(false);

    const placedSongIds = new Set(
        tiers.flatMap(tier => tier.songs)
    );

    const [filter, setFilter] = useState({
        mode: "single" as ChartMode,
        level: 22,
    });

    const exportRef = useRef<HTMLDivElement>(null);

    const levels = useMemo(() => {

        const levels = new Set<number>();

        songs.forEach(song => {

            song.charts[filter.mode].forEach(level => {

                levels.add(level);

            });

        });

        return [...levels].sort((a,b)=>a-b);

    }, [filter.mode]);

    useEffect(() => {
        if (levels.length === 0) {
            return;
        }
        clearAllTiers();
        if (!levels.includes(filter.level)) {
            setFilter(prev => ({
                ...prev,
                level: levels[0],
            }));
        }
    }, [
        levels,
        filter.level,
    ]);

    const songPool = songs.filter(
        song => !placedSongIds.has(song.title)
    );

    const filteredSongs = songPool.filter(song =>
        song.charts[filter.mode].includes(filter.level)
    );

    const clearAllTiers = () => {

        setTiers(prev =>
            prev.map(tier => ({
                ...tier,
                songs: [],
            }))
        );

    };

    const saveAsImage = async () => {

        if (!exportRef.current) {

            return;

        }


        const { toPng } = await import(
            "html-to-image"
        );


        const dataUrl = await toPng(
            exportRef.current,
            {
                pixelRatio: 2,
            }
        );


        const link = document.createElement("a");

        link.download =
            `${tierInfo.title}_${tierInfo.version}_${filter.mode}${filter.level}.png`;

        link.href = dataUrl;

        link.click();

    };

    return (

        <DndContext 
            onDragEnd={(event)=>{
                const {
                    active,
                    over
                } = event;

                if(!over) {
                    return;
                }

                const songId = String(active.id);
                const targetId = String(over.id);

                if(targetId === "song-pool"){
                    setTiers(prev =>
                        prev.map(tier => ({
                            ...tier,
                            songs:
                                tier.songs.filter(
                                    id => id !== songId
                                )
                        }))
                    );

                    return;
                }

                setTiers(prev => 
                    prev.map(tier => {
                        let updatedSongs =
                            tier.songs.filter(
                                id => id !== songId
                            );

                        if(tier.id === targetId){
                            updatedSongs.push(songId);
                        }

                        return {
                            ...tier,
                            songs: updatedSongs
                        };
                    })
                );

                // Song Pool에서 제거
                
            }}>

            <div className="workspace">
                <div className="app-container">
                    <HeaderEditor
                        headerInfo={tierInfo}
                        setHeaderInfo={setTierInfo}
                        previewMode={previewMode}
                        setPreviewMode={setPreviewMode}
                        onSaveImage={saveAsImage}
                    />
                    <div
                        ref={exportRef}
                        className="tier-export-area"
                    >
                        <Header

                            title={tierInfo.title}

                            subtitle={tierInfo.subtitle}

                            creator={tierInfo.creator}

                            version={tierInfo.version}

                            mode={filter.mode}

                            level={filter.level}

                        />

                        <TierBoard
                            tiers={tiers}
                            setTiers={setTiers}
                            songs={[
                                ...songs
                            ]}
                            previewMode={previewMode}
                        />

                        <div className="marker-area">
                            <div className="marker-group">
                                <div className="channel">
                                    S
                                </div>
                                <div className="marker-label">
                                    숏컷
                                </div>
                            </div>
                            <div className="marker-group">
                                <div className="channel">
                                    M
                                </div>
                                <div className="marker-label">
                                    리믹스
                                </div>
                            </div>
                            <div className="marker-group">
                                <div className="channel">
                                    F
                                </div>
                                <div className="marker-label">
                                    풀 송
                                </div>
                            </div>
                            <div className="marker-group">
                                <div className="premium">
                                    P
                                </div>
                                <div className="marker-label">
                                    프리미엄 전용
                                </div>
                            </div>
                            <div className="marker-group">
                                <div className="rise">
                                    R
                                </div>
                                <div className="marker-label">
                                    라이즈 전용
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="song-pool-area">
                    {!previewMode && (
                        <FilterBar
                            filter={filter}
                            setFilter={setFilter}
                            availableLevels={levels}
                        />
                    )}

                    {!previewMode && (
                        <SongPool songs={filteredSongs} />
                    )}
                </div>

            </div>

        </DndContext>

    );

}




export default App;