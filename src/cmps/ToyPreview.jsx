import { Link } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy }) {

    return (
        <article>
            <Link to={`/toy/${toy._id}`} >
                <h4>{toy.name}</h4>
                <img src="./public/teddy.png" alt="" />
            </Link>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p className={toy.inStock ? 'in-stock' : 'out-of-stock'}>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
            {/* <p>Owner: <span>{toy.owner && toy.owner.fullname}</span></p> */}
            <div>
                <button onClick={() => {
                    onRemoveToy(toy._id)
                }}>x</button>
                <Link to={`/toy/edit/${toy._id}`}>
                    <button>Edit</button>
                </Link>
            </div>
            {/* <button className="buy" onClick={() => {
                addToCart(toy)
            }}>Add to Cart</button> */}
        </article>
    )
}
