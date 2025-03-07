import PublicPatternList from "../components/publicPatternList"
import patternService from "../services/patternService"
import type { Route } from "../+types/root"

export async function loader() {
    const patterns = await patternService.getAll().then(r => r.data)
    return { patterns }
}

const PublicPatternPage = ({ loaderData }: Route.ComponentProps) => {
    // const [sizes, setSizes] = useState<Size[]>([])
    // // TODO api call(s) for, may need additional endpoint(s)
    // const [selectedSizes, setSelectedSizes] = useState<Set<number>>(new Set)
    // const handleSize = (sizeId: number) => {
    //     const newSelection = new Set(selectedSizes)
    //     if (selectedSizes.has(sizeId)) {
    //         newSelection.delete(sizeId)
    //     } else { newSelection.add(sizeId) }
    //     setSelectedSizes(newSelection)
    // }

    // const [yarns, setYarns] = useState<Yarn[]>([])
    // const [selectedYarns, setSelectedYarns] = useState<Set<number>>(new Set)
    // const handleYarn = (yarnId: number) => {
    //     const newSelection = new Set(selectedYarns)
    //     if (selectedYarns.has(yarnId)) {
    //         newSelection.delete(yarnId)
    //     } else {
    //         newSelection.add(yarnId)
    //     }
    //     setSelectedYarns(newSelection)
    // }

    // const [cats, setCats] = useState<Category[]>([])
    // const [selectedCats, setSelectedCats] = useState<Set<number>>(new Set)
    // const handleCat = (catId: number) => {
    //     const newSelection = new Set(selectedCats)
    //     if (newSelection.has(catId)) {
    //         newSelection.delete(catId)
    //     } else {
    //         newSelection.add(catId)
    //     }
    //     setSelectedCats(newSelection)
    // }

    // const [showFilters, setShowFilters] = useState(false)

    // TODO api call, is the filtering better to do w/ state or some form of conditional rendering

    const { patterns } = loaderData

    // const selectedFilters = () => {
    //     // TODO Come back to this
    // }

    return (
        <>
            <h1>Discover new patterns</h1>
            {/* TODO Add in filter once I have figured out best solution */}
            <PublicPatternList
                patterns={patterns}
            />
        </>
    )
}

export default PublicPatternPage
