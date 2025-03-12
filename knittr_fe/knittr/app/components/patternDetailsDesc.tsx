import { Pattern } from "../helpers/apiResponseTypes";

const PatternDetailsDesc = ({ pattern }: { pattern: Pattern }) => {

    const sizesByAge = Object.groupBy(pattern.sizes, ({ ageRange }) => ageRange || 'none')


    return (
        <div id="pattern-desc" >
            <div id="size-list">
                <h4>Sizes: </h4>
                {pattern.sizes.length > 1 ?
                    Object.keys(sizesByAge)
                        .map(age => (<p key={age}>{`${age !== 'none' ? `${age}: ` : ''}${sizesByAge.age?.map(s => s.name).join(", ")}`}</p>))
                    : <p>{pattern.sizes.length ? pattern.sizes[0].name : "n/a"}</p>
                }
            </div>
            <div id="yarn-list">
                <h4>Yarns: </h4>
                <p>{pattern.yarns.map(y => y.name).join(", ")}</p>
            </div>
            <p id="desc-body">{pattern.desc}</p>
        </div >)
}

export default PatternDetailsDesc
