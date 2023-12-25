const TOYS_KEY = 'toysDB'
// const PAGE_SIZE = 8

import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    save,
    removeToy,
    getToyById,
    debounce,
    getDefaultFilter,
    getEmptyToy,
}

_createDemoData()

function query(filterBy = {
    name: '', inStock: 'all', maxPrice: Infinity,
    pageIdx: 0, labels: [], sortBy: "name"
}) {
    console.log('filterBy:', filterBy)
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
            if (filterBy.maxPrice) {
                toys = toys.filter((toy) => (toy.price <= filterBy.maxPrice))

            }
            if (filterBy.labels.length > 0) {
                toys = toys.filter(toy => {
                    return filterBy.labels.some(label => toy.labels.includes(label.value));
                })
            }

            return _getSortedtoys(sortBy, toys)
        })
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
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function getTotaltoys() {
    const toys = localStorage.getItem(TOYS_KEY)
    if (toys.length) return toys.length

}

function getDefaultFilter() {
    return { name: '', maxPrice: Infinity, inStock: 'all', labels: [] }
}

function getEmptyToy() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']

    return {
        name: '',
        price: '',
        labels: labels.splice(utilService.getRandomIntInclusive(0, labels.length - 4), 3),
        inStock: true
    }
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

function _createDemoData() {
    const toysFromStorage = JSON.parse(localStorage.getItem(TOYS_KEY))
    if (!toysFromStorage || !toysFromStorage.length) {

        const demoToys = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                inStock: true,
            },
            {
                _id: 't102',
                name: 'Car',
                price: 43,
                labels: ['Car', 'Battery Powered', 'On wheels'],
                inStock: false,
            },
            {
                _id: 't103',
                name: 'Puzzle',
                price: 59,
                labels: ['Puzzle', 'Art', 'Box game'],
                inStock: true,
            },
            {
                _id: 't104',
                name: 'Baby Doll',
                price: 39,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                inStock: false,
            },
            {
                _id: 't105',
                name: 'Spiderman',
                price: 25,
                labels: ['Doll'],
                inStock: false,
            },
            {
                _id: 't106',
                name: 'Truck',
                price: 79,
                labels: ['Outdoor', 'Battery Powered', 'On wheels'],
                inStock: true,
            },
        ]
        localStorage.setItem(TOYS_KEY, JSON.stringify(demoToys))

    }
}