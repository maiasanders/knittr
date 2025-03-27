import { MouseEventHandler, useState } from "react"

import { faSliders } from "@fortawesome/free-solid-svg-icons"
import Modal from 'react-bootstrap/Modal'

import type { Route } from "../+types/root"
import { Category, Pattern } from "../../helpers/apiResponseTypes"

import PublicPatternList from "../../components/publicPatternList"
import CurrentFiltersBar from "../../components/currentFiltersBar"
import CatFilterSection from "../../components/catFilterSection/catFilterSection"
import ClickableIcon from "../../components/clickableIcon/clickableIcon"

import patternService from "../../services/patternService"
import categoryService from "../../services/categoryService"

import './publicPatternPage.css'

export async function loader() {
    const patterns = await patternService.getAll().then(r => r.data)
    const categories = await categoryService.getAll().then(r => r.data)
    return { patterns, categories }
}

const PublicPatternPage = ({ loaderData }: Route.ComponentProps) => {

    const { patterns, categories } = loaderData
    // TODO add filtering for yarns, sizes
    const [selectedCats, setSelectedCats] = useState<Category[]>([]);
    const [showFilterPopup, setShowFilterPopup] = useState(false)

    const removeCat: MouseEventHandler = (e) => {
        setSelectedCats([...selectedCats.filter(c => c.categoryId !== parseInt(e.currentTarget.id.slice(4)))])
    }

    const handleToggle = (cat: Category) => {
        const catId = cat.categoryId
        if (selectedCats.map(c => c.categoryId).includes(catId)) {
            setSelectedCats([...selectedCats.filter(c => c.categoryId !== catId)])
        } else {
            setSelectedCats([...selectedCats, cat])
        }
    }

    const filteredPatterns = selectedCats.length > 0
        ? patterns.filter((pat: Pattern) => {
            for (let cat of pat.categories) {
                if (selectedCats.map(c => c.categoryId).includes(cat.categoryId)) return pat;
            }
        }) : patterns

    return (
        <main id="public-patterns-page">
            <h1 id="public-pattern-title">Discover new patterns</h1>
            <ClickableIcon icon={faSliders} handleClick={() => setShowFilterPopup(!showFilterPopup)} />
            <Modal
                show={showFilterPopup}
                onHide={() => setShowFilterPopup(false)}
            >
                <CatFilterSection
                    cats={categories}
                    selectedCats={selectedCats.map(c => c.categoryId)}
                    handleToggle={handleToggle}
                />
            </Modal>
            {/* {showFilterPopup && <CatFilterSection
                cats={categories}
                selectedCats={selectedCats.map(c => c.categoryId)}
                handleToggle={handleToggle}
            />} */}
            {selectedCats.length > 0 && (<CurrentFiltersBar selectedCats={selectedCats} removeCat={removeCat} />)}
            <PublicPatternList
                patterns={filteredPatterns}
            />
        </main>
    )
}

export default PublicPatternPage
