import React, { useRef } from 'react'
import { useClickOutside, useCloseModal } from '../../../../hooks'

interface Props {
    setState: React.Dispatch<React.SetStateAction<boolean>>
    message?: string
    className?: string
    onConfirm?: () => void
}

export const Confirm: React.FC<Props> = ({ setState, message, className, onConfirm }) => {
    const overlayRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)

    const handleClose = useCloseModal(setState)

    useClickOutside(overlayRef, innerRef, setState)

    return (
        <div className="modal pt-5 px-5" ref={overlayRef}>
            <div style={{ width: 300 }} className="modal-inner bg-white rounded-lg" ref={innerRef}>
                {/* header */}
                <div className="flex justify-between p-4 px-5">
                    <h3 className="roboto text-gray-500 font-medium text-base">Confirmation</h3>
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
                <div className="px-7 pt-2 pb-2">
                    <div className={className}>{message}</div>
                </div>

                {/* footer */}
                <div className="px-5 py-6 flex justify-center flex-col gap-2">
                    <button
                        onClick={handleClose}
                        className="roboto font-medium bg-white border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md px-3 py-2"
                    >
                        Cancel
                    </button>
                    <button onClick={onConfirm} className={`roboto font-medium bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2 text-white`}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
