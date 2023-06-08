import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
    const navigate = useNavigate()

    const handler = useCallback(async () => {
        const target = `${import.meta.env.VITE_API_URL}/logout`
        const doLogout = async () => {
            try {
                await fetch(target)
            } catch (err) {
                return await Promise.reject(err)
            }
        }

        try {
            await toast.promise(
                doLogout(),
                {
                    success: 'Logout successfuly',
                    error: (err: TypeError) => err.message,
                    loading: 'processing logout...',
                },
                { className: 'roboto', position: 'top-right' }
            )

            navigate('/auth')
            return
        } catch (err) {
            await Promise.reject(err)
        }
    }, [])

    return handler
}
