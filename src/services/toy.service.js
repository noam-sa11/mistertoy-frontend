const TOYS_KEY = 'mytoys'
// const PAGE_SIZE = 8

import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

export const toyService = {
    query,
    save,
    removeToy,
    getToyById,
    debounce,
    getDefaultFilter,
}

_createDemoData()

function query(filterBy = { name: '', inStock: 'all', price: Infinity, pageIdx: 0, sortBy: "name" }) {
    const { sortBy } = filterBy
    return storageService.query(TOYS_KEY)
        .then(toys => {
            // if (filterBy.pageIdx !== undefined) {
            //     const startIdx = filterBy.pageIdx * PAGE_SIZE
            //     toys = toys.slice(startIdx, PAGE_SIZE + startIdx)
            // }
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            if (filterBy.inStock !== 'all') {
                toys = toys.filter((toy) => (filterBy.inStock === 'true' ? toy.inStock : !toy.inStock))
            }

            return _getSortedtoys(sortBy, toys)
        })
}

function _getSortedtoys(sortBy, toys) {
    let sortedtoys
    if (sortBy === 'name') {
        sortedtoys = toys.sort((a, b) => {
            const toyA = a.name.toUpperCase()
            const toyB = b.name.toUpperCase()
            if (toyA < toyB) {
                return -1;
            }
            if (toyA > toyB) {
                return 1;
            }
            return 0;
        });
    } else if (sortBy === 'price') {
        sortedtoys = toys.sort((a, b) => a.price - b.price)
    } else {
        sortedtoys = toys.sort((a, b) => a.createdAt - b.createdAt)
    }
    return sortedtoys
}

function getToyById(id) {
    return storageService.get(TOYS_KEY, id)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOYS_KEY, toy)
    } else {
        toy.createdAt = Date.now()
        return storageService.post(TOYS_KEY, toy)
    }
}

function removeToy(toyId) {
    return storageService.remove(TOYS_KEY, toyId)
}

function debounce(func, wait) {
    let timeout

    return function executedFunction(...args) {
        const later = () => {
            timeout = null
            func(...args)
        };
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function getTotaltoys() {
    const toys = localStorage.getItem(TOYS_KEY)
    if (toys.length) return toys.length

}

function _createDemoData() {
    const demoToys = [
        { name: 'Toy1', price: 10, inStock: true },
        { name: 'Toy2', price: 20, inStock: false },
        { name: 'Toy3', price: 15, inStock: true },
        // Add more dummy data as needed
    ];

    demoToys.forEach((toy) => {
        save(toy)
    })
}

function getDefaultFilter() {
    return { name: '', price: Infinity, inStock: 'all' }
}