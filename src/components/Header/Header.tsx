import "./Header.css";
import { ChartModeLabel, type ChartMode } from "../../types/ChartMode";
import { getLevelImage } from "../../utils/levelImage";
import logo from "../../assets/logo.png";

interface HeaderProps {

    title: string;

    subtitle: string;

    creator: string;

    version: string;

    mode: ChartMode;

    level: number;

}

function Header({

    title,

    subtitle,

    creator,

    version,

    mode,

    level,

}: HeaderProps) {

    return (

        <header className="header">
            <div className="tdiv">
                <h1>{title}</h1>

                <h2>{subtitle}</h2>
                
            </div>

            <div className="hdiv">
                <img className="logo"

                    src={logo}

                    alt={`logo`}

                />
                <div className="vdiv">

                    <h2 className="version">

                        v{version}

                    </h2>
                    <p className="version">

                        {creator} 제작

                    </p>
                </div>

                <img className="img"

                    src={getLevelImage(mode, level)}

                    alt={`${ChartModeLabel[mode]}${level}`}

                />
            </div>

        </header>
    );

}

export default Header;