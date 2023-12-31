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

async function getById(userId) {
    try {
        return await httpService.get(BASE_URL + userId)
    } catch (error) {
        console.error('Error getting user by ID:', error)
        throw error
    }
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })

        if (user) return _setLoggedinUser(user)
        else throw new Error('Invalid login')
    } catch (error) {
        console.error('Error during login:', error)
        throw error
    }
}

async function signup({ username, password, fullname }) {
    const newUser = { username, password, fullname }
    try {
        const user = await httpService.post(BASE_URL + 'signup', newUser)

        if (user) return _setLoggedinUser(user)
        else throw new Error('Invalid signup')
    } catch (error) {
        console.error('Error during signup:', error)
        throw error
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (error) {
        console.error('Error during logout:', error)
        throw error
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin, username: user.username }
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