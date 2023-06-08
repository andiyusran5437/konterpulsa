import { useCallback } from 'react'
import toast from 'react-hot-toast'

export const useDeleteProdcut = () => {
    const handler = useCallback(async (id: number) => {
        const target = `${import.meta.env.VITE_API_URL}/products/${id}`
        const deleteProduct = async () => {
            try {
                const response = await fetch(target, {
                    method: 'DELETE',
                })
                const status = response.status
                if (status !== 200) return await Promise.reject(new Error('Something error'))
            } catch (err) {
                return await Promise.reject(err)
            }
        }

        try {
            await toast.promise(
                deleteProduct(),
                {
                    success: 'Deleteing product successfuly',
                    error: 'Something went wrong!',
                    loading: 'processing delete product...',
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
