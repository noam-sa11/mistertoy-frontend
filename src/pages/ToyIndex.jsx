// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'

import { toyService } from '../services/toy.service.js'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'

export function toyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const cart = useSelector(storeState => storeState.toyModule.shoppingCart)
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

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsgRedux(`toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                console.log('Cannot update toy', err)
                showErrorMsgRedux('Cannot update toy')
            })
    }

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(filterBy)
    }

    function addToCart(toy) {
        console.log('toy:', toy)
        console.log(`Adding ${toy.name} to cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsgRedux('Added to cart')
    }

    return (
        <div>
            <h3>toys App</h3>
            <main>
                <button onClick={onAddToy}>Add toy ⛐</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading && <ToyList
                    toys={toys}
                    onEditToy={onEditToy}
                    onRemoveToy={onRemoveToy}
                    addToCart={addToCart}
                />}
                {isLoading && <div>Loading...</div>}
                <hr />
                <pre>{JSON.stringify(cart, null, 2)}</pre>
            </main>
        </div>
    )

}