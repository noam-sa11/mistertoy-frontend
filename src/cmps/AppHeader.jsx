import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { userService } from '../services/user.service.js'
import { UserMsg } from './UserMsg.jsx'
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'

import { SET_USER } from '../store/reducers/user.reducer.js'
import { useEffect } from 'react'
// import { SET_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'

export function AppHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    // const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)

    useEffect(() => {

    }, user)

    async function onLogout() {
        try {
            await userService.logout()
            onSetUser(null)
            showSuccessMsgRedux('Logged out successfully')
            navigate('/')
        } catch (err) {
            showErrorMsgRedux('Oops, try again')
        }
    }

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
    }

    // function onToggleCart(ev) {
    //     ev.preventDefault()
    //     dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })
    // }

    return (
        <header className="app-header main-layout flex align-center space-between">
            <nav className="app-nav">
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/dashboard" >Dashboard</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/" >Login/Sign-Up</NavLink>
                {/* <a onClick={onToggleCart} href="#">🛒 Cart</a> */}
            </nav>
            {user &&
                <section className="login-section">
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            }

            <UserMsg />
        </header>
    )
}
