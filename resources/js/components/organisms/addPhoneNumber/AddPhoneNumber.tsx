import { format } from 'libphonenumber-js'
import React, { useCallback, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useClickOutside, useCloseModal } from '../../../hooks'

interface Props {
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddPhoneNumber: React.FC<Props> = ({ setState }) => {
    const overlayRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const handleClose = useCloseModal(setState)
    useClickOutside(overlayRef, innerRef, setState)

    const handleSubmit = useCallback(() => {
        const input = inputRef.current
        if (input != null) {
            const value = input.value
            const formattedPhoneNumber = format(value, 'ID', 'NATIONAL') // format number
            const rawNumber = formattedPhoneNumber.replace(/\D/g, '')
            input.value = formattedPhoneNumber
            const rawLen = rawNumber.length

            if (rawLen >= 10) {
                searchParams.set('phone', rawNumber)
                const params = searchParams.toString()
                navigate({
                    pathname: '/order-list',
                    search: `?${params}`,
                })
                handleClose()
            } else {
                toast.error('Number must more than or equal to 10', {
                    position: 'top-right',
                    className: 'roboto',
                })
            }
        }
    }, [])

    return (
        <div ref={overlayRef} className="modal pt-5 px-5">
            <div ref={innerRef} style={{ width: 325 }} className="modal-inner bg-white rounded-lg">
                {/* Header */}
                <div className="flex justify-between p-4 px-6">
                    <h3 className="text-gray-500 font-medium roboto">Change number</h3>
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
                <div className="px-6 pb-5 pt-4">
                    <input
                        ref={inputRef}
                        className="roboto w-full bg-slate-50 text-gray-500 border focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none px-4 py-2.5 text-base font-medium rounded-lg"
                        type="text"
                        placeholder="Enter phone number here"
                    />
                </div>
                {/* footer */}
                <div className="px-5 pb-4 flex justify-center flex-col">
                    <button onClick={handleSubmit} className={`roboto bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2 text-white mb-2`}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
