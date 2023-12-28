// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { loadToys, removeToyOptimistic, setFilterBy } from '../store/actions/toy.actions.js'
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadData()
    }, [filterBy])

    async function loadData() {
        try {
            await loadToys()
            showSuccessMsgRedux('Toys loaded successfully')
        } catch (error) {
            console.error('Error loading toys:', error)
            showErrorMsgRedux('Cannot show toys')
        }
    }
    // useEffect(() => {
    //     loadToys()
    //         .then(() => {
    //             showSuccessMsgRedux('Toys loaded successfully')
    //         })
    //         .catch(() => {
    //             showErrorMsgRedux('Cannot show toys')
    //         })
    // }, [filterBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsgRedux('Toy removed successfully')
        } catch (error) {
            console.error('Error removing toy:', error)
            showErrorMsgRedux('Cannot remove toy')
        }
    }
    // function onRemoveToy(toyId) {
    //     removeToyOptimistic(toyId)
    //         .then(() => {
    //             showSuccessMsgRedux('Toy removed successfully')
    //         })
    //         .catch(err => {
    //             console.log('Cannot remove toy', err)
    //             showErrorMsgRedux('Cannot remove toy')
    //         })
    // }

    // function onAddToy() {
    //     const toyToSave = toyService.getEmptyToy()
    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             console.log('savedtoy:', savedToy)
    //             showSuccessMsgRedux(`toy added (vendor: ${savedToy.vendor})`)
    //         })
    //         .catch(err => {
    //             console.log('Cannot add toy', err)
    //             showErrorMsgRedux('Cannot add toy')
    //         })
    // }

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
        <main className='toy-index grid'>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            {isLoading && <div>Loading...</div>}
            {!isLoading && <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
            />}
        </main>
    )

}