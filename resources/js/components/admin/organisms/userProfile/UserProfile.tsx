import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useCloseModal, useClickOutside, useFetchUser, useUpdateUser } from '../../../../hooks'
import { type UserRequest, type User } from '../../../../types'

interface Props {
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserProfile: React.FC<Props> = ({ setState }) => {
    const [user, setUser] = useState<User>()
    const overlayRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const userRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    const handleClose = useCloseModal(setState)
    useClickOutside(overlayRef, innerRef, setState)

    const fetchUser = useFetchUser()
    useEffect(() => {
        fetchUser()
            .then((data) => {
                setUser(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const updateUser = useUpdateUser()
    const handleUpdate = useCallback(() => {
        const name = nameRef.current?.value ?? ''
        const user = userRef.current?.value ?? ''
        const pass = passRef.current?.value ?? ''

        if (name.length < 4) {
            toast.error('Name at least more than 3', { className: 'roboto', position: 'top-right' })
            return
        }

        if (user.length < 6) {
            toast.error('Username at least more than 5', { className: 'roboto', position: 'top-right' })
            return
        }

        if (pass.length !== 0 && pass !== 'helloworld' && pass.length < 6) {
            toast.error('Password at least be more than 5', { className: 'roboto', position: 'top-right' })
            return
        }

        const request: UserRequest = {
            name,
            email: user,
            password: pass !== 'helloworld' ? pass : '',
        }

        updateUser(request)
            .then(() => {
                setState(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div ref={overlayRef} className="modal pt-5 px-5">
            <div ref={innerRef} style={{ width: 325 }} className="modal-inner bg-white rounded-lg">
                {/* Header */}
                <div className="flex justify-between p-4 px-6">
                    <h3 className="text-gray-500 font-medium roboto">User Profiles</h3>
                    <button onClick={handleClose} className="hover:text-gray-500 text-gray-400">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                {/* body */}
                <div className="px-6 pb-5 pt-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between pb-2.5 border-b border-dashed">
                        <span className="text-sm font-medium text-gray-500">Name:</span>
                        <input ref={nameRef} className="text-sm text-right outline-none text-gray-400" type="text" placeholder="Enter your password" defaultValue={user?.name} />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Username:</span>
                        <input ref={userRef} className="text-sm text-right outline-none text-gray-400" type="text" placeholder="Enter your password" defaultValue={user?.email} />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Password:</span>
                        <input
                            ref={passRef}
                            className="text-sm text-right outline-none text-gray-400"
                            type="password"
                            placeholder="Enter your password"
                            defaultValue={'helloworld'}
                        />
                    </div>
                </div>
                {/* footer */}
                <div className="px-5 pb-4 flex justify-center flex-col">
                    <button onClick={handleUpdate} className={`roboto font-normal bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2 text-white mb-2`}>
                        Update data
                    </button>
                </div>
            </div>
        </div>
    )
}
