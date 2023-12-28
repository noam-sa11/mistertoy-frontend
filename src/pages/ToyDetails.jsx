
import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsgRedux } from '../store/actions/app.actions.js'
import { useNavigate, useParams } from "react-router-dom"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

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
    // function loadToy() {
    //     toyService.getToyById(toyId)
    //         .then((toy) => setToy(toy))
    //         .catch((err) => {
    //             console.log('Had issues in toy details', err)
    //             showErrorMsgRedux('Cannot load toy')
    //             navigate('/toy')
    //         })
    // }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy Name : {toy.name}</h1>
            <h2>Price: ${toy.price}</h2>
            <h2>labels: <span>{toy.labels.join(' | ')}</span></h2>
            <h2>Created at: <span>{toy.createdAt}</span></h2>
            <h3>In Stock: <span>{(toy.inStock) ? 'yes' : 'no'}</span></h3>
            <p>⛐</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        </section>
    )
}