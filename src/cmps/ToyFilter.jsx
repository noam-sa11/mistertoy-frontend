import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"
import { Link } from 'react-router-dom'
import { loadToys, getToysLabels } from '../store/actions/toy.actions.js'
import { showErrorMsgRedux, showSuccessMsgRedux } from "../store/actions/app.actions.js"


export function ToyFilter({ filterBy, onSetFilter }) {
    const [labelsOpt, setLabelsOpt] = useState(null)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        loadData()
        getLabels()
    }, [])

    async function loadData() {
        try {
            await loadToys()
            showSuccessMsgRedux('Toys loaded successfully')
        } catch (error) {
            console.error('Error loading toys:', error)
            showErrorMsgRedux('Cannot show toys')
        }
    }

    async function getLabels() {
        const labels = await getToysLabels()
        setLabelsOpt(labels)
    }

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    // const labelOptions = getLabels()
    // console.log('labelOptions:', labelOptions)
    if (!labelsOpt) return <div>Loading...</div>

    return (
        <section className="toy-filter full main-layout">
            <form >
                {/* <label htmlFor="name">Name:</label> */}
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="Search by Name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />

                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="Max price..."
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                <label>Stock Status</label>
                <select
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock || 'all'}
                    onChange={handleChange}
                >
                    <option value="all">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>

                <label htmlFor="sortBy">Sort By</label>
                <select
                    id="sortBy"
                    name="sortBy"
                    value={filterByToEdit.sortBy || 'name'}
                    onChange={handleChange}
                >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Created</option>
                </select>

                <label htmlFor="labels">Category</label>
                <section className="filter-categories">
                    {labelsOpt.map((label) => (
                        <button
                            key={label}
                            className={`btn-label flex justify-center align-center ${filterByToEdit.labels && filterByToEdit.labels.includes(label) ? 'active' : ''}`}
                            onClick={(ev) => {
                                ev.preventDefault()
                                const selectedLabels = filterByToEdit.labels || [];
                                const updatedLabels = selectedLabels.includes(label)
                                    ? selectedLabels.filter((selectedLabel) => selectedLabel !== label)
                                    : [...selectedLabels, label];
                                console.log('updatedLabels:', updatedLabels)
                                setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: updatedLabels }));
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </section>


                {/* <Select
                    id="labels"
                    name="labels"
                    isMulti
                    options={labelOptions.map(label => ({ value: label, label: label }))}
                    value={filterByToEdit.labels || []}
                    onChange={(selectedLabels) =>
                        setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: selectedLabels }))
                    }
                /> */}
                <Link to="/toy/edit" className='self-center'><button >Add Toy</button></Link>
            </form>
        </section>
    )
}