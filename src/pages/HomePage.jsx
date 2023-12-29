import { useDispatch, useSelector } from "react-redux"
import { LoginSignup } from "../cmps/LoginSignup"
import { SET_USER } from "../store/reducers/user.reducer"
import { useNavigate } from "react-router-dom"

export function HomePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const count = useSelector(storeState => storeState.userModule.count)

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
        navigate('/')
    }
    return (
        <section className="login-section">
            <LoginSignup onSetUser={onSetUser} />
        </section>
    )
}