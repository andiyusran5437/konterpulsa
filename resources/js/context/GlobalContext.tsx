import React, { useMemo } from 'react'

export const GlobalContext = React.createContext({})
export interface GlobalContextType {
    orderExp: number
}

interface Props {
    children?: React.ReactNode
}

export const GlobalProvicer: React.FC<Props> = ({ children }) => {
    const data = useMemo<GlobalContextType>(() => {
        return {
            orderExp: 3600,
        }
    }, [])

    return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
}
