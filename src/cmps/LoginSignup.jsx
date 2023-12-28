import { useState } from 'react'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

// const { useState } = React

export function LoginSignup({ onSetUser }) {

    const [isSignup, setIsSignUp] = useState(false)

    async function onLogin(credentials) {
        try {
            if (isSignup) {
                await _signup(credentials)
            } else {
                await _login(credentials)
            }
        } catch (err) {
            showErrorMsgRedux('Oops, try again')
        }
    }

    async function _login(credentials) {
        await login(credentials)
        onSetUser()
        showSuccessMsgRedux('Logged in successfully')
    }

    async function _signup(credentials) {
        await signup(credentials)
        onSetUser()
        showSuccessMsgRedux('Signed up successfully')
    }
    // function onLogin(credentials) {
    //     isSignup ? _signup(credentials) : _login(credentials)
    // }

    // function _login(credentials) {
    //     login(credentials)
    //         .then(onSetUser)
    //         .then(() => { showSuccessMsgRedux('Logged in successfully') })
    //         .catch((err) => { showErrorMsgRedux('Oops try again') })
    // }

    // function _signup(credentials) {
    //     signup(credentials)
    //         .then(onSetUser)
    //         .then(() => { showSuccessMsgRedux('Signed in successfully') })
    //         .catch((err) => { showErrorMsgRedux('Oops try again') })
    // }

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div >
    )
}
