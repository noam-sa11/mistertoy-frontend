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
}

// const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

async function query(filterBy = {}) {
    try {
        return await httpService.get(BASE_URL, filterBy)
    } catch (error) {
        console.error('Error during toy query:', error)
        throw error
    }
}
// function query(filterBy = {}) {
//     return httpService.get(BASE_URL, filterBy)
// }

async function getToyById(toyId) {
    try {
        return await httpService.get(BASE_URL + toyId)
    } catch (error) {
        console.error('Error getting toy by ID:', error)
        throw error
    }
}
// function getToyById(toyId) {
//     return httpService.get(BASE_URL + toyId)
// }

async function save(toy) {
    try {
        if (toy._id) {
            return await httpService.put(BASE_URL + toy._id, toy)
        } else {
            toy.createdAt = Date.now()
            return await httpService.post(BASE_URL, toy)
        }
    } catch (error) {
        console.error('Error during toy save:', error)
        throw error
    }
}
// function save(toy) {
//     if (toy._id) {
//         return httpService.put(BASE_URL + toy._id, toy)
//     } else {
//         toy.createdAt = Date.now()
//         return httpService.post(BASE_URL, toy)
//     }
// }

async function removeToy(toyId) {
    try {
        return await httpService.delete(BASE_URL + toyId)
    } catch (error) {
        console.error('Error during toy removal:', error)
        throw error
    }
}
// function removeToy(toyId) {
//     return httpService.delete(BASE_URL + toyId)
// }

function getDefaultFilter() {
    return { name: '', maxPrice: '', inStock: 'all', labels: [] }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: ['toy'],
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