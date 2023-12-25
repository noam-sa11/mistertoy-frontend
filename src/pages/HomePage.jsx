import { useDispatch, useSelector } from "react-redux"

export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff)
        dispatch({ type: 'CHANGE_BY', diff })
    }

    return (
        <section>
            <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 >
        </section >
    )
}