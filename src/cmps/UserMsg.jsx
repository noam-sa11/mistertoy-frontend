import { setMsg } from "../store/actions/app.actions.js"

import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

export function UserMsg() {
    const msg = useSelector((storeState) => storeState.appModule.msg)

    const timeoutIdRef = useRef()

    useEffect(() => {
        if (!msg) return
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current)
            timeoutIdRef.current = null
        }
        timeoutIdRef.current = setTimeout(closeMsg, 3000)
    }, [msg])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>
    return (
        <section className={`user-msg ${msg.type}`}>
            <button onClick={closeMsg}>x</button>
            <p>{msg.txt}</p>
        </section>
    )
}
