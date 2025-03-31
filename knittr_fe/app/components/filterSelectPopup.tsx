import { ChangeEventHandler } from "react";
import { Category, Size, Yarn } from "../helpers/apiResponseTypes"
import SizeFilterSection from "./sizeFilterSection";
import YarnFilterSection from "./yarnFilterSection";
import CatFilterSection from "./catFilterSection/catFilterSection";

const FilterSelectPopup = ({ sizes, yarns, cats, selectedSizes, selectedYarns, selectedCats, handleSize, handleYarn, handleCat }: { sizes: Size[], yarns: Yarn[], cats: Category[], selectedSizes: Set<number>, selectedYarns: Set<number>, selectedCats: Set<number>, handleSize: ChangeEventHandler, handleYarn: ChangeEventHandler, handleCat: ChangeEventHandler }) => {

    return (<div>
        <h2>Filters</h2>
        {/* TODO add ability to search? */}
        <SizeFilterSection
            sizes={sizes}
            selectedSizes={selectedSizes}
            handleToggle={handleSize}
        />
        <YarnFilterSection
            yarns={yarns}
            selectedYarns={selectedYarns}
            handleToggle={handleYarn}
        />
        <CatFilterSection
            cats={cats}
            selectedCats={selectedCats}
            handleToggle={handleCat}
        />
    </div>)
}

export default FilterSelectPopup;
