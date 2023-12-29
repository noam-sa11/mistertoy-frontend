import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

// const BASE_URL = '/api/auth/'
const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const STORAGE_KEY = 'userDB'

export const userService = {
    login,
    logout,
    signup,
    query,
    getById,
    getLoggedinUser,
    // updateScore,
    getEmptyCredentials
}

async function query() {
    try {
        return await httpService.query(STORAGE_KEY)
    } catch (error) {
        console.error('Error during user query:', error)
        throw error
    }
}
// function query() {
//     return httpService.query(STORAGE_KEY)
//     // return storageService.query(STORAGE_KEY)
// }

async function getById(userId) {
    try {
        return await httpService.get(BASE_URL + userId)
    } catch (error) {
        console.error('Error getting user by ID:', error)
        throw error
    }
}
// function getById(userId) {
//     return httpService.get(BASE_URL + userId)
//     // return storageService.get(BASE_URL + userId)
// }

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        // const user = await storageService.post(BASE_URL + 'login', { username, password })

        if (user) return _setLoggedinUser(user)
        else throw new Error('Invalid login')
    } catch (error) {
        console.error('Error during login:', error)
        throw error
    }
}
// function login({ username, password }) {
//     return httpService.post(BASE_URL + 'login', { username, password })
//         // return storageService.post(BASE_URL + 'login', { username, password })
//         .then(user => {
//             if (user) return _setLoggedinUser(user)
//             else return Promise.reject('Invalid login')
//         })
// }

async function signup({ username, password, fullname }) {
    const newUser = { username, password, fullname }
    try {
        const user = await httpService.post(BASE_URL + 'signup', newUser)
        // const user = await storageService.post(BASE_URL + 'signup', user)

        if (user) return _setLoggedinUser(user)
        else throw new Error('Invalid signup')
    } catch (error) {
        console.error('Error during signup:', error)
        throw error
    }
}
// function signup({ username, password, fullname }) {
//     const user = { username, password, fullname }
//     return httpService.post(BASE_URL + 'signup', user)
//         // return storageService.post(BASE_URL + 'signup', user)
//         .then(user => {
//             if (user) return _setLoggedinUser(user)
//             else return Promise.reject('Invalid signup')
//         })
// }

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        // await storageService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (error) {
        console.error('Error during logout:', error)
        throw error
    }
}
// function logout() {
//     return httpService.post(BASE_URL + 'logout')
//         // return storageService.post(BASE_URL + 'logout')
//         .then(() => {
//             sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
//         })
// }

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

// function updateScore(diff) {
//     if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
//     return storageService.put('user/', { diff })
//         .then(user => {
//             _setLoggedinUser(user)
//             return user.score
//         })
// }

