
import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions.js'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

export function ToyDetails() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    const [toy, setToy] = useState(null)
    const [msgTxt, setMsgTxt] = useState('')

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

    const handleMsgSubmit = async (ev) => {
        ev.preventDefault()

        if (!user) {
            showErrorMsgRedux('Please log in to submit a msg.')
            return
        }

        try {
            const updatedToy = await toyService.addMsg(toyId, { txt: msgTxt })
            setToy(updatedToy)
            setMsgTxt('')
            loadToy()

            showSuccessMsgRedux('msg added successfully')
        } catch (error) {
            console.error('Error adding msg:', error)
            showErrorMsgRedux('Error adding msg. Please try again.')
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <div className="img-container flex justify-center align-center">
                <img src="/teddy.png" alt="" />
                {/* <img src={`${toy.url}`} alt="" /> */}

            </div>
            <h1>Toy Name: {toy.name}</h1>
            <h2>Price: <span className="price">${toy.price}</span></h2>
            {/* <h2>labels: <span>{toy.labels.join(' | ')}</span></h2> */}
            <h3>In Stock: <span>{(toy.inStock) ? 'yes' : 'no'}</span></h3>
            <br />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <br />

            {/* msg Form */}
            {user && (
                <form onSubmit={handleMsgSubmit} className="msg-form">
                    <label>
                        Add a Message:
                        <textarea
                            value={msgTxt}
                            onChange={(ev) => setMsgTxt(ev.target.value)}
                        />
                    </label>
                    <button type="submit">Send Message</button>
                </form>
            )}

            {toy.msgs && toy.msgs.length > 0 &&
                <div className="msgs-section">
                    <h3>Message:</h3>
                    {toy.msgs.map((msg) => (
                        <div key={msg.id} className="msg-item">
                            <p className="msg-text">{msg.txt}</p>
                            <p className="msg-by">By: {msg.by.fullname}</p>
                        </div>
                    ))}
                </div>
            }
            {!toy.msgs &&
                <div>
                    <h3>No Message</h3>
                </div>
            }
        </section>
    )
}