import { useCallback } from 'react'

export const useReload = (setReloadCount: React.Dispatch<React.SetStateAction<number>>) => {
    const handler = useCallback(() => {
        setReloadCount((prev) => prev + 1)
    }, [])

    return handler
}
