import { useCallback } from 'react'
import { type User } from '../types'

export const useFetchUser = () => {
    const handler = useCallback(async () => {
        const target = `${import.meta.env.VITE_API_URL}/users`
        const doFetch = async () => {
            try {
                const response = await fetch(target, {
                    headers: {
                        Accept: 'application/json',
                    },
                })
                const data: User = await response.json()

                return await Promise.resolve(data)
            } catch (err) {
                return await Promise.reject(err)
            }
        }

        try {
            const data = await doFetch()
            return await Promise.resolve(data)
        } catch (err) {
            return await Promise.reject(err)
        }
    }, [])

    return handler
}
