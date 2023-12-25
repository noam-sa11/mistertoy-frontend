export const SET_MSG = 'SET_MSG'

const initialState = {
    msg: null
}
export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MSG:
            console.log('Hi from app reducer...')
            return {
                ...state, msg: action.msg
            }
        default:
            return state
    }
}