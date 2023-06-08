import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { type BrandStatusRequest } from '../types'

export const useUpdateStatusBrand = () => {
    const handler = useCallback(async (id: number, data: BrandStatusRequest): Promise<void> => {
        const doPost = async (): Promise<void> => {
            const target = `${import.meta.env.VITE_API_URL}/brands/${id}/status`
            const method = 'PUT'
            const token = localStorage.getItem('token') ?? ''

            try {
                const response = await fetch(target, {
                    method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                })

                const status = response.status
                if (status !== 200) {
                    await Promise.reject(new Error(await response.text()))
                }
            } catch (err) {
                await Promise.reject(err)
            }
        }

        try {
            await toast.promise(
                doPost(),
                {
                    success: 'Update status successfuly',
                    error: 'Something went wrong!',
                    loading: 'processing update...',
                },
                { className: 'roboto', position: 'top-right' }
            )
        } catch (err) {
            await Promise.reject(err)
        }
    }, [])

    return handler
}
