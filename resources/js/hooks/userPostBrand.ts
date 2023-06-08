import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { type BrandPostRequest } from '../types'

export const userPostBrand = () => {
    const handler = useCallback(async (data: BrandPostRequest): Promise<void> => {
        const doPost = async (): Promise<void> => {
            const { isEdit } = data
            const { brand } = data
            const addedRoute = data.id !== undefined ? `/${data.id}` : ''
            const target = `${import.meta.env.VITE_API_URL}/brands${addedRoute}`
            let method = 'POST'
            if (isEdit === true) method = 'PUT'
            const token = localStorage.getItem('token') ?? ''

            try {
                const response = await fetch(target, {
                    method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(brand),
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
                    success: 'Posting brand successfuly',
                    error: 'Something went wrong!',
                    loading: 'processing posting brand...',
                },
                { className: 'roboto', position: 'top-right' }
            )
        } catch (err) {
            await Promise.reject(err)
        }
    }, [])

    return handler
}
