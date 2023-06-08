import { useCallback } from 'react'

export const useFetchOrderCount = () => {
    const handler = useCallback(async (status: string) => {
        const target = `${import.meta.env.VITE_API_URL}/orders/count?status=${status}`
        const doFetch = async () => {
            try {
                const response = await fetch(target, {
                    headers: {
                        Accept: 'application/json',
                    },
                })

                const data = await response.json()
                return await Promise.resolve(data)
            } catch (err) {
                return await Promise.reject(err)
            }
        }

        try {
            const count: number = await doFetch()
            return await Promise.resolve(count)
        } catch (err) {
            return await Promise.reject(err)
        }
    }, [])

    return handler
}
