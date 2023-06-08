import { useCallback } from 'react'
import toast from 'react-hot-toast'
// import toast from 'react-hot-toast'
import { type ProductRequest } from '../types'

export const usePostProduct = () => {
    const handler = useCallback(async (request: ProductRequest): Promise<void> => {
        const id: string = request.id !== undefined ? `${request.id}` : ''
        const isEdit = request.isEdit ?? false
        const additonalUrl = isEdit ? `/${id}` : ''

        const target = `${import.meta.env.VITE_API_URL}/products${additonalUrl}`
        const method = isEdit ? 'PUT' : 'POST'
        const postProduct = async () => {
            try {
                const response = await fetch(target, {
                    method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request.product),
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
                    success: 'Posting product successfuly',
                    error: (err: TypeError) => err.message,
                    loading: 'processing posting product...',
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
