
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions.js'

import { toyService } from '../services/toy.service.js'
import { loadToy, saveToy } from '../store/actions/toy.actions.js'

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) _loadToy()
    }, [])

    function _loadToy() {
        loadToy(toyId)
            .then(setToyToEdit)
            .catch((err) => {
                console.log('Had issued in toy edit:', err)
                navigate('/toy')
                showErrorMsgRedux('Toy not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value || '' : target.value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsgRedux('Toy has been saved!')
                navigate('/toy')
            })
            .catch((err) => {
                console.log('Cannot add toy', err)
                showErrorMsgRedux('Cannot add toy')
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="txt">Toy Text:</label>
                <input
                    onChange={handleChange}
                    placeholder='New toy'
                    value={toyToEdit.name}
                    type="text"
                    name="name"
                    id="txt"
                />

                <button>{toyToEdit._id ? 'Edit' : 'Add'} Toy</button>
            </form>
        </section>
    )
}
