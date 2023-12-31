
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
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

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

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsgRedux('Toy removed successfully')
        } catch (error) {
            console.error('Error removing toy:', error)
            showErrorMsgRedux('Cannot remove toy')
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <main className='toy-index grid'>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            {isLoading && <div>Loading...</div>}
            {!isLoading && <ToyList
                user={user}
                toys={toys}
                onRemoveToy={onRemoveToy}
            />}
        </main>
    )

}