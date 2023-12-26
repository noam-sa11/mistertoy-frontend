
import * as yup from 'yup'
import Select from 'react-select'

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
            .then(toy => setToyToEdit(toy))
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
        const schema = yup.object().shape({
            name: yup.string().required('Toy Name is required'),
            price: yup.number().required('Toy Price is required').positive('Price must be positive'),
        })
        schema.validate(toyToEdit, { abortEarly: false })
            .then(() => {
                console.log('toyToEdit:', toyToEdit)
                saveToy(toyToEdit)
                    .then((savedToy) => {
                        console.log('savedToy:', savedToy)
                        showSuccessMsgRedux('Toy has been saved!')
                        navigate('/toy')
                    })
                    .catch((err) => {
                        console.log('Cannot add toy', err)
                        showErrorMsgRedux('Cannot add toy')
                    })
            })
            .catch((validationErrors) => {
                showErrorMsgRedux('Validations errors')
                console.error(validationErrors)
            })

    }

    const labelOptions = toyService.getLabels()
    console.log('toyToEdit:', toyToEdit)
    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
            con
            <form onSubmit={onSaveToy}>
                <label htmlFor="txt">Toy Name:</label>
                <input
                    onChange={handleChange}
                    placeholder='New toy'
                    value={toyToEdit.name}
                    type="text"
                    name="name"
                    id="txt"
                />
                <label htmlFor="price">Toy Price:</label>
                <input
                    onChange={handleChange}
                    placeholder='Price'
                    value={toyToEdit.price}
                    type="number"
                    name="price"
                    id="price"
                />
                {/* <label htmlFor="labels">Toy Labels:</label>
                <Select
                    id="labels"
                    name="labels"
                    isMulti
                    options={labelOptions.map(label => ({ value: label, label: label }))}
                    value={toyToEdit.labels.map(label => ({ value: label, label: label })) || []}
                    onChange={(selectedLabels) =>
                        setToyToEdit((prevToy) => ({ ...prevToy, labels: selectedLabels }))
                    }
                /> */}

                <button>{toyToEdit._id ? 'Edit' : 'Add'} Toy</button>
            </form>
        </section>
    )
}
