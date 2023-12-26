const TOYS_KEY = 'toysDB'
const BASE_URL = 'toy/'

// const PAGE_SIZE = 8

import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

export const toyService = {
    query,
    save,
    removeToy,
    getToyById,
    debounce,
    getDefaultFilter,
    getEmptyToy,
    getLabels,
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getToyById(toyId) {
    return httpService.get(BASE_URL + toyId, toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        toy.createdAt = Date.now()
        return httpService.post(BASE_URL, toy)
    }
}

function removeToy(toyId) {
    return httpService.delete(BASE_URL + toyId, toyId)
}

export function getTotaltoys() {
    const toys = localStorage.getItem(TOYS_KEY)
    if (toys.length) return toys.length

}

function getLabels() {
    return [...labels]
}

function getDefaultFilter() {
    return { name: '', maxPrice: '', inStock: 'all', labels: [] }
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