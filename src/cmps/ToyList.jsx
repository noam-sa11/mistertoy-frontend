import { ToyPreview } from "./ToyPreview.jsx";
import PropTypes from 'prop-types'

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {
    if (!toys.length) return <div>No Toys To Display 🧸</div>
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id} className="toy-preview">
                    <ToyPreview
                        key={toy._id}
                        toy={toy}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />
                </li>
            )}
        </ul>
    )
}

// toyList.defaultProps = {
//     baba: "BABABABAB"
// }

// toyList.propTypes = {
//     txt(props, propName, cmpName) {
//         // console.log('props:', props)
//         // console.log('propName:', propName)
//         // console.log('cmpName:', cmpName)
//         if (typeof props[propName] !== 'string') {
//             return new Error('Not a string!')
//         }
//     },
//     nums: PropTypes.arrayOf(PropTypes.number),
//     baba: PropTypes.string.isRequired
// }