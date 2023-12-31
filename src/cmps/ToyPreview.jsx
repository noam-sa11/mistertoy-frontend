import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function ToyPreview({ user, toy, onRemoveToy }) {
    return (
        <article>
            <Link to={`/toy/${toy._id}`} className="flex justify-center align-center">
                <div className="img-container flex justify-center align-center">
                    <img src="/teddy.png" alt="" />
                </div>
            </Link>
            <h4>{toy.name}</h4>
            <section className="flex space-between align-center">
                <span>${toy.price.toLocaleString()}</span>
                <p className={toy.inStock ? 'in-stock' : 'out-of-stock'}>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
            </section>
            {/* <button className="buy" onClick={() => {
                addToCart(toy)
            }}>Add to Cart</button> */}
            {user?.isAdmin &&
                <div>
                    <button className="btn btn-remove" onClick={() => {
                        onRemoveToy(toy._id)
                    }}>x</button>
                    <Link to={`/toy/edit/${toy._id}`}>
                        <button className="btn btn-edit">Edit</button>
                    </Link>
                </div>
            }
        </article>
    )
}
