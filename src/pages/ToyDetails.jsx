
import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions.js'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

export function ToyDetails() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    const [toy, setToy] = useState(null)
    const [reviewText, setReviewText] = useState('')

    const { toyId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const loadedToy = await toyService.getToyById(toyId)
            setToy(loadedToy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsgRedux('Cannot load toy')
            navigate('/toy')
        }
    }

    const handleReviewSubmit = async (ev) => {
        ev.preventDefault()

        if (!user) {
            showErrorMsgRedux('Please log in to submit a review.')
            return
        }

        try {
            const updatedToy = await toyService.addReview(toyId, { txt: reviewText })
            setToy(updatedToy)
            setReviewText('')
            loadToy()

            showSuccessMsgRedux('Review added successfully')
        } catch (error) {
            console.error('Error adding review:', error)
            showErrorMsgRedux('Error adding review. Please try again.')
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <div className="img-container flex justify-center align-center">
                <img src="/teddy.png" alt="" />
            </div>
            <h1>Toy Name: {toy.name}</h1>
            <h2>Price: <span className="price">${toy.price}</span></h2>
            {/* <h2>labels: <span>{toy.labels.join(' | ')}</span></h2> */}
            <h3>In Stock: <span>{(toy.inStock) ? 'yes' : 'no'}</span></h3>
            <br />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <br />

            {/* Review Form */}
            {user && (
                <form onSubmit={handleReviewSubmit} className="review-form">
                    <label>
                        Add a Review:
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                    </label>
                    <button type="submit">Submit Review</button>
                </form>
            )}

            {toy.msgs && toy.msgs.length > 0 &&
                <div className="reviews-section">
                    <h3>Reviews:</h3>
                    {toy.msgs.map((review) => (
                        <div key={review.id} className="review-item">
                            <p className="review-text">{review.txt}</p>
                            <p className="review-by">By: {review.by.fullname}</p>
                        </div>
                    ))}
                </div>
            }
            {!toy.msgs &&
                <div>
                    <h3>No Reviews</h3>
                </div>
            }
        </section>
    )
}