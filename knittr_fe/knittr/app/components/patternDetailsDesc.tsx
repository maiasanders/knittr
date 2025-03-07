import { Pattern } from "../helpers/apiResponseTypes";

const PatternDetailsDesc = ({ pattern }: { pattern: Pattern }) => {

    const sizesByAge = Object.groupBy(pattern.sizes, ({ ageRange }) => ageRange || 'none')


    return (
        <div id="pattern-desc" >
            <div id="size-list">
                <h4>Sizes: </h4>
                {Object.keys(sizesByAge).map(age => (<p>{`${age !== 'none' ? `${age}: ` : ''}${sizesByAge.age?.join(", ")}`}</p>))}
            </div>
            <div id="yarn-list">
                <h4>Yarns: </h4>
                <p>{pattern.yarns.map(y => y.name).join(", ")}</p>
            </div>
            <p id="desc-body">{pattern.desc}</p>
        </div >)
}

export default PatternDetailsDesc
