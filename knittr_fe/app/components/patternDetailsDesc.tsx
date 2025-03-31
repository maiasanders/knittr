import { Pattern } from "../helpers/apiResponseTypes";

const PatternDetailsDesc = ({ pattern }: { pattern: Pattern }) => {

    const sizes = pattern.variants.map(v => v.size)
    const yarns = getUniqueStrings(pattern.variants.map(v => v.yarn.name))

    const sizesByAge = Object.groupBy(sizes, ({ ageRange }) => ageRange || 'none')

    let sizeStrings = [];

    for (const [age, sizes] of Object.entries(sizesByAge)) {

        if (age !== 'n/a') {
            sizeStrings.push(`${age}: ${getUniqueStrings(sizes?.map(s => s.name) || []).join(', ')}`)
        } else {
            sizeStrings.push(sizes?.map(s => s.name).join(', '))
        }
    }


    return (
        <div id="pattern-desc" >
            <div id="size-list">
                <h4>Sizes: </h4>
                {sizeStrings.map((s, i) => (<p key={`age-${i}`}>{s}</p>))}
            </div>
            <div id="yarn-list">
                <h4>Yarns: </h4>
                <p>{yarns.join(", ")}</p>
            </div>
            <p id="desc-body">{pattern.desc}</p>
        </div >)
}

export default PatternDetailsDesc

const getUniqueStrings = (arr: string[]) => {
    let unique: string[] = []
    for (const s of arr) {
        if (!unique.includes(s)) {
            unique.push(s)
        }
    }
    return unique
}
