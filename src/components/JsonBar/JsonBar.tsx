import "./JsonBar.css";


interface JsonBarProps {
    onSaveJson: () => void;
    onLoadJson: () => void;
}

function JsonBar({ onSaveJson, onLoadJson }: JsonBarProps) {
    return (
        <div className="json-bar">
            <button
                onClick={onSaveJson}
            >
                JSON 저장
            </button>
            <button
                onClick={onLoadJson}
            >
                JSON 불러오기
            </button>
        </div>
    );
}

export default JsonBar;