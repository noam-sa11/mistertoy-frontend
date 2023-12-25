import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { userService } from '../services/user.service.js'
import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'

import { SET_USER } from '../store/reducers/user.reducer.js'
import { SET_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'

export function AppHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)

    function onLogout() {
        userService.logout()
            .then(() => {
                onSetUser(null)
                showSuccessMsgRedux('Logged out successfully')
            })
            .catch((err) => {
                showErrorMsgRedux('OOPs try again')
            })
    }

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
        navigate('/')
    }

    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React toy App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <a onClick={onToggleCart} href="#">🛒 Cart</a>
                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup onSetUser={onSetUser} />
                </section>
            )}
            <UserMsg />
        </header>
    )
}
