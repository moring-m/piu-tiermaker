import "./JsonBar.css";


interface JsonBarProps {
    onSaveJson: () => void;
    onLoadJson: () => void;
    onOpenHelp: () => void;
}

function JsonBar({ onSaveJson, onLoadJson, onOpenHelp }: JsonBarProps) {
    return (
        <div className="json-bar">
            <label>
                PIU Tiermaker
            </label>
            <button className="infobutton"
                onClick={onOpenHelp}
            >
                도움말
            </button>
            <button className="button"
                onClick={onSaveJson}
            >
                JSON 저장
            </button>
            <button className="button"
                onClick={onLoadJson}
            >
                JSON 불러오기
            </button>
        </div>
    );
}

export default JsonBar;