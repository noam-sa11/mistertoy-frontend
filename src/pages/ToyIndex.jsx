// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { loadToys, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'

import { toyService } from '../services/toy.service.js'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { Link } from 'react-router-dom'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(() => {
                showErrorMsgRedux('Cannot show toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsgRedux('toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsgRedux('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                console.log('savedtoy:', savedToy)
                showSuccessMsgRedux(`toy added (vendor: ${savedToy.vendor})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsgRedux('Cannot add toy')
            })
    }

    // function onEditToy(toy) {
    //     const price = +prompt('New price?')
    //     const toyToSave = { ...toy, price }

    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             showSuccessMsgRedux(`toy updated to price: $${savedToy.price}`)
    //         })
    //         .catch(err => {
    //             console.log('Cannot update toy', err)
    //             showErrorMsgRedux('Cannot update toy')
    //         })
    // }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <div>
            <h3>toys App</h3>
            <main>
                <Link to="/toy/edit"><button>Add Toy</button></Link>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {isLoading && <div>Loading...</div>}
                {!isLoading && <ToyList
                    toys={toys}
                    // onEditToy={onEditToy}
                    onRemoveToy={onRemoveToy}
                />}
            </main>
        </div>
    )

}