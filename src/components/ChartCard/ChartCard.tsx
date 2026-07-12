import type { Song } from "../../types/song";
import "./ChartCard.css";

interface ChartCardProps {
    song: Song;
}

/*
function getDifficulty(song: Song) {

    return [

        ...song.charts.single.map(
            level => `S${level}`
        ),

        ...song.charts.double.map(
            level => `D${level}`
        ),

    ];

}*/

function ChartCard({
    song
}: ChartCardProps) {
    return (
        <div className="chart-card">
                
            <div className="chart-card-header">
                <span>{song.title}</span>
            </div>

            <div className="chart-card-jacket">

                <img
                    src={song.jacket}
                    alt={song.title}
                />

                {song.channel == 1 && (
                    <div className="channel-icon">
                        S
                    </div>
                )}

                {song.channel == 2 && (
                    <div className="channel-icon">
                        M
                    </div>
                )}

                {song.channel == 3 && (
                    <div className="channel-icon">
                        F
                    </div>
                )}

                {song.limit == 1 && (
                    <div className="premium-icon">
                        P
                    </div>
                )}

                {song.limit == 2 && (
                    <div className="rise-icon">
                        R
                    </div>
                )}

            </div>
        </div>
    );
}

export default ChartCard;