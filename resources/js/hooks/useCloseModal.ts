import { useCallback } from 'react'

type setState = React.Dispatch<React.SetStateAction<boolean>>

export const useCloseModal = (setState: setState) => {
    const handler = useCallback(() => {
        setState(false)
    }, [])

    return handler
}
