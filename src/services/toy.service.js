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
    addReview,
    debounce,
    getDefaultFilter,
    getEmptyToy,
}

async function query(filterBy = {}) {
    try {
        return await httpService.get(BASE_URL, filterBy)
    } catch (error) {
        console.error('Error during toy query:', error)
        throw error
    }
}

async function getToyById(toyId) {
    try {
        return await httpService.get(BASE_URL + toyId)
    } catch (error) {
        console.error('Error getting toy by ID:', error)
        throw error
    }
}

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

async function removeToy(toyId) {
    try {
        return await httpService.delete(BASE_URL + toyId)
    } catch (error) {
        console.error('Error during toy removal:', error)
        throw error
    }
}

async function addReview(toyId, reviewText) {
    try {
        // const txt = {
        //     txt: reviewText,
        // }
        return await httpService.post(BASE_URL + toyId + '/msg', reviewText);
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
}

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