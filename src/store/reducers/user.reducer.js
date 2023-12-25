import { userService } from "../../services/user.service.js"

/// user
export const SET_USER = 'SET_USER'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        // user
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        default:
            return state
    }
}
