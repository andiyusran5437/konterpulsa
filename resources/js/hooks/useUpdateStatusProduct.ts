import { useCallback } from 'react'
import toast from 'react-hot-toast'
// import toast from 'react-hot-toast'
import { type ProductStatusRequest } from '../types'

export const useUpdateStatusProduct = () => {
    const handler = useCallback(async (id: number, request: ProductStatusRequest): Promise<void> => {
        const target = `${import.meta.env.VITE_API_URL}/products/${id}/status`
        const method = 'PUT'
        const postProduct = async () => {
            try {
                const response = await fetch(target, {
                    method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request),
                })
                const status = response.status
                if (status === 422) {
                    const jsonData = await response.json()
                    return await Promise.reject(new Error(jsonData.message))
                }
                if (status !== 200) return await Promise.reject(new Error('Something went wrong'))
            } catch (err) {
                return await Promise.reject(err)
            }
        }

        try {
            await toast.promise(
                postProduct(),
                {
                    success: 'Update status successfuly',
                    error: (err: TypeError) => err.message,
                    loading: 'processing update...',
                },
                { className: 'roboto', position: 'top-right' }
            )
            return
        } catch (err) {
            await Promise.reject(err)
        }
    }, [])

    return handler
}
