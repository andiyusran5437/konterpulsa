import React, { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { type AuthResponse } from '../../../types'

export const Auth: React.FC = () => {
    const userRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const getXSRF = async (): Promise<string> => {
        const target = `${import.meta.env.VITE_WEB_URL}/sanctum/csrf-cookie`
        const cookieName = 'XSRF-TOKEN'

        try {
            await fetch(target)
            const cookies = document.cookie.split('; ')
            const xrf = cookies.find((cookie) => cookie.startsWith(cookieName))?.split('=')[1] ?? ''
            return await Promise.resolve(xrf)
        } catch (err) {
            return await Promise.reject(err)
        }
    }

    const doLogin = async (user: string, pass: string): Promise<boolean> => {
        const target = `${import.meta.env.VITE_API_URL}/auth`

        try {
            const token = await getXSRF()
            const decodedToken = decodeURIComponent(token)

            const response = await fetch(target, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': decodedToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user,
                    password: pass,
                }),
            })

            const data: AuthResponse = await response.json()
            if (data.success) {
                localStorage.setItem('token', data.token)
                return await Promise.resolve(true)
            } else {
                return await Promise.reject(new Error('not found'))
            }
        } catch (err) {
            return await Promise.reject(err)
        }
    }

    const handleLogin = () => {
        const user = userRef.current
        const pass = passRef.current

        if (user != null && pass != null) {
            toast
                .promise(
                    doLogin(user.value, pass.value),
                    {
                        loading: 'Loading...',
                        success: 'Login succeed',
                        error: 'something went wrong',
                    },
                    { className: 'roboto' }
                )
                .then(() => {
                    navigate('/admin')
                })
                .catch(() => null)
        }
    }

    useEffect(() => {
        // getXSRF().catch(() => null)
    }, [])

    return (
        <>
            <div className="flex justify-center">
                <div className="mt-36 max-w-xs w-80">
                    <div className="text-center">
                        <h1 className="roboto font-semibold text-gray-600 text-4xl">Login</h1>
                        <div className="mt-2 text-gray-400 roboto font-medium">Authentication needed for access</div>
                    </div>
                    <div className="mt-7">
                        <input
                            ref={userRef}
                            className="w-full border border-gray-200 focus:border-indigo-200 focus:ring-2 ring-indigo-400  outline-none px-4 py-2 rounded-md text-gray-500 text-base font-medium roboto"
                            type="text"
                            placeholder="Username"
                            defaultValue="claud17@example.com"
                        />
                        <input
                            ref={passRef}
                            className="mt-2.5 w-full border border-gray-200 focus:border-indigo-200 focus:ring-2 ring-indigo-400  outline-none px-4 py-2 rounded-md text-gray-500 text-base font-medium roboto"
                            type="password"
                            placeholder="Password"
                            defaultValue="dummypass"
                        />

                        <button
                            onClick={handleLogin}
                            className={`bg-indigo-500 hover:bg-indigo-600 w-full mt-4 p-2 rounded-md outline-none text-gray-100 hover:text-gray-50 font-medium roboto`}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
