import React, { useMemo } from 'react'

export const AdminContext = React.createContext({})
export interface AdminContextType {
    user_id: string
}

interface Props {
    children?: React.ReactNode
}

export const AdminProvider: React.FC<Props> = ({ children }) => {
    const data = useMemo<AdminContextType>(() => {
        return {
            user_id: '1',
        }
    }, [])

    return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>
}
