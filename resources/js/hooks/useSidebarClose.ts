import { useCallback, useContext } from 'react'
import { AppContext, type AppContextType } from '../context/AppContext'

export const useSidebarClose = () => {
    const context = useContext(AppContext) as AppContextType

    const handler = useCallback(() => {
        context.setSidebarShown(false)
    }, [])

    return handler
}
