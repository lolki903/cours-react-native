import { createContext, useState } from "react";

interface CounterType {
    counter: number,
    setCounter:number
}

export const CounterContext = createContext<CounterType>({
    counter: 0,
    setCounter:0
})

const CounterProvider = ({children}: {children: React.ReactNode}) => {
    const [counter, setCounter] = useState(0)
    return(
        <CounterContext.Provider value={{counter, setCounter}}>
            { children }
        </CounterContext.Provider>
    )
}
export default CounterProvider