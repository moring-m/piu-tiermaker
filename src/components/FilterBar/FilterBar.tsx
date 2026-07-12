import type { ChartMode } from "../../types/ChartMode";
import "./FilterBar.css";

interface Filter {

    mode: ChartMode;

    level: number;

}

interface FilterBarProps {

    filter: Filter;

    setFilter: React.Dispatch<React.SetStateAction<Filter>>;

    availableLevels: number[];

}

function FilterBar({
    filter,
    setFilter,
    availableLevels,
}: FilterBarProps) {
    return (
        <div className="filter-bar">
            <label className="filter-title">곡 목록</label>
            <select className="filter-group"
                value={filter.mode}
                onChange={(e)=>{
                    setFilter(prev=>({
                        ...prev,
                        mode:e.target.value as ChartMode,
                    }));
                }}
            >
                <option value="single">
                    싱글
                </option>

                <option value="double">
                    더블
                </option>

                <option value="halfDouble">
                    하프더블
                </option>

                <option value="coop">
                    코옵
                </option>
            </select>

            <select className="filter-group"
                value={filter.level}
                onChange={(e)=>{
                    setFilter(prev=>({
                        ...prev,
                        level:Number(e.target.value),
                    }));
                }}
            >
                {
                    availableLevels.map(level=>
                        <option
                            key={level}
                            value={level}
                        >
                            {level}
                        </option>
                    )
                }
            </select>
        </div>
    );
}


export default FilterBar;