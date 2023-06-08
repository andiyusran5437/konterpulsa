import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useClickOutside, useCloseModal, useUpdateStatusBrand } from '../../../hooks'
import { type BrandStatus, type BrandStatusRequest } from '../../../types'

interface Props {
    setState: React.Dispatch<React.SetStateAction<boolean>>
    id: number
    defaultStatus: BrandStatus
    setStatusCallback: (status: BrandStatus) => void
}

export const BrandStatusModal: React.FC<Props> = ({ setState, id, setStatusCallback, defaultStatus }) => {
    const [status, setStatus] = useState<BrandStatus>(defaultStatus)
    const overlayRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)

    const handleClick = (status: BrandStatus) => {
        setStatus(status)
    }

    useClickOutside(overlayRef, innerRef, setState)

    const handleClose = useCloseModal(setState)

    const updateStatus = useUpdateStatusBrand()
    const handleSubmit = () => {
        console.log('submit')
        if (status === undefined) {
            toast.error('Status must be selected.', { position: 'top-right', className: 'roboto' })
            return
        }

        const request: BrandStatusRequest = { status }
        updateStatus(id, request)
            .then(() => {
                setState(false)
                setStatusCallback(status)
            })
            .catch(() => null)
    }

    return (
        <>
            <div ref={overlayRef} className="modal pt-5 px-5">
                <div ref={innerRef} style={{ width: 325 }} className="modal-inner bg-white rounded-lg">
                    {/* Header */}
                    <div className="flex justify-between p-4 px-6">
                        <h3 className="text-gray-500 font-medium roboto">Choose status</h3>
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
                        <div
                            onClick={() => {
                                handleClick('active')
                            }}
                            className={`${
                                status === 'active' ? 'bg-blue-50 ring-2' : 'bg-gray-50 hover:bg-gray-100'
                            } cursor-pointer text-left mb-2.5 rounded-md py-3 px-4 roboto text-gray-500 font-medium`}
                        >
                            <span>Status Active</span>
                        </div>
                        <div
                            onClick={() => {
                                handleClick('hold')
                            }}
                            className={`${
                                status === 'hold' ? 'bg-blue-50 ring-2' : 'bg-gray-50 hover:bg-gray-100'
                            } cursor-pointer text-left mb-2.5 rounded-md py-3 px-4 roboto text-gray-500 font-medium`}
                        >
                            <span>Status Hold</span>
                        </div>
                        <div
                            onClick={() => {
                                handleClick('deleted')
                            }}
                            className={`${
                                status === 'deleted' ? 'bg-blue-50 ring-2' : 'bg-gray-50 hover:bg-gray-100'
                            } cursor-pointer text-left mb-2.5 rounded-md py-3 px-4 roboto text-gray-500 font-medium`}
                        >
                            <span>Status Deleted</span>
                        </div>
                    </div>
                    {/* footer */}
                    <div className="px-5 pb-4 flex justify-center flex-col">
                        <button
                            onClick={handleClose}
                            className="outline-none roboto bg-white border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md px-3 py-2 mb-2"
                        >
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className={`outline-none roboto bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2 text-white mb-2`}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
