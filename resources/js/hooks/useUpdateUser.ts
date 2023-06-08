import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { type UserRequest } from '../types'

export const useUpdateUser = () => {
    const handler = useCallback(async (request: UserRequest) => {
        const target = `${import.meta.env.VITE_API_URL}/users`

        const doUpdate = async () => {
            try {
                await fetch(target, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request),
                })

                await Promise.resolve()
            } catch (err) {
                return await Promise.reject(err)
            }
        }

        try {
            await toast.promise(
                doUpdate(),
                {
                    success: 'Update successfuly',
                    error: 'Something went wrong!',
                    loading: 'Processing update...',
                },
                { className: 'roboto', position: 'top-right' }
            )
        } catch (err) {
            await Promise.reject(err)
        }
    }, [])
    return handler
}
