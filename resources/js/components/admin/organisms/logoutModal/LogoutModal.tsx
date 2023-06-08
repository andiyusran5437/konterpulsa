import React, { useCallback, useRef } from 'react'
import { useClickOutside, useCloseModal, useLogout } from '../../../../hooks'

interface Props {
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const LogoutModal: React.FC<Props> = ({ setState }) => {
    const overlayRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)

    const handleClose = useCloseModal(setState)
    useClickOutside(overlayRef, innerRef, setState)

    const logout = useLogout()
    const handleLogout = useCallback(() => {
        logout().catch(() => null)
    }, [])

    return (
        <div ref={overlayRef} className="modal pt-5 px-5">
            <div ref={innerRef} style={{ width: 325 }} className="modal-inner bg-white rounded-lg">
                {/* Header */}
                <div className="flex justify-between p-4 px-6">
                    <h3 className="text-gray-500 font-medium roboto">Logout confirmation</h3>
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
                <div className="px-6 pb-6 pt-4 flex flex-col gap-2.5">
                    <div className="text-gray-500">Are you sure want to logout this account?</div>
                </div>
                {/* footer */}
                <div className="px-5 pb-4 flex justify-center flex-col">
                    <button onClick={handleLogout} className={`roboto font-normal bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2 text-white mb-2`}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
