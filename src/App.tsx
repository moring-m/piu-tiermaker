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
import { exportTierList, downloadJson, loadJsonFile, } from "./services/saveService";
import JsonBar from "./components/JsonBar/JsonBar";

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

    const loadingJsonRef = useRef(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (loadingJsonRef.current) {
            loadingJsonRef.current = false;
            return;
        }

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

    const saveAsJson = () => {
        const saveData = exportTierList({
            header: tierInfo,
            filter,
            tiers,
        });
        downloadJson(saveData);
    };

    const loadFromJson = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        loadingJsonRef.current = true;

        const saveData = await loadJsonFile(file);

        setFilter(saveData.filter);
        setTierInfo(saveData.header);
        setTiers(saveData.tiers);
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
                                    라이즈 연동
                                </div>
                            </div>
                        </div>

                        <div className="site-info-area">
                            Created with PIU Tiermaker by moring
                        </div>
                        <div className="source-info-area">
                            
                            PIU Tiermaker is a fan-made tool for Pump It Up. All game-related assets and resources used in this project are the property of their respective copyright holders.
                        </div>
                    </div>
                </div>
                <div className="song-pool-area">
                    {!previewMode && (
                        <JsonBar
                            onSaveJson={saveAsJson}
                            onLoadJson={() => fileInputRef.current?.click()}
                        />
                    )}
                    {!previewMode && (
                        <div>
                            <div className="use-info-area">
                                곡 목록에서 자켓을 끌어다가 티어에 배치하세요. (난이도 바꾸면 초기화됩니다)
                            </div>
                            <div className="use-info-area">
                                티어 이름 클릭하면 수정 가능하고, 추가 및 삭제, 그리고 색 변경도 됩니다.
                            </div>
                            <div className="use-info-area">
                                미리보기 누르면 깔끔하게 볼 수 있고, 이미지로 저장 가능합니다.
                            </div>
                            <div className="use-info-area">
                                이미지로 저장할 때는 되도록 페이지 배율을 100%로 설정해주세요.
                            </div>
                            <div className="use-info-area">
                                Json 파일로 내보내 저장하거나 이미 만들어진 서열표를 불러올 수 있습니다.
                            </div>
                        </div>
                    )}
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

            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{
                    display: "none",
                }}
                onChange={loadFromJson}
            />
        </DndContext>

    );

}




export default App;