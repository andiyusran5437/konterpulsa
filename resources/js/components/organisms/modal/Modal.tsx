import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useClickOutside, useCloseModal } from '../../../hooks'
import { type Bank, type OrderRequest, type PaymentResponse, type Product } from '../../../types'

interface Props {
    setState: React.Dispatch<React.SetStateAction<boolean>>
    credit: Product | null
    phoneNumber: string
}

export const Modal: React.FC<Props> = ({ setState, credit, phoneNumber }) => {
    const [bank, setBank] = useState<Bank>()
    const overlayRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const [searchParams] = useSearchParams()

    const handleClick = (item: Bank) => {
        setBank(item)
    }

    useClickOutside(overlayRef, innerRef, setState)

    const handleClose = useCloseModal(setState)
    const navigate = useNavigate()

    const handleSubmit = () => {
        const productId = credit?.id ?? 0
        const putOrder = async (): Promise<void> => {
            const target = `${import.meta.env.VITE_API_URL}/orders`
            const requestBody: OrderRequest = {
                product_id: productId,
                phone_number: phoneNumber,
                payment: {
                    bank: bank ?? 'bri',
                },
            }

            try {
                const response = await fetch(target, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                })
                const statusCode = response.status
                if (statusCode !== 200) await Promise.reject(new Error('Something went wrong'))
                const jsonData: PaymentResponse = await response.json()
                const responseStatus = jsonData.status_code
                if (responseStatus === '201') {
                    handleClose()
                    searchParams.set('phone', phoneNumber)
                    const params = searchParams.toString()
                    navigate({
                        pathname: '/order-list',
                        search: `?${params}`,
                    })
                } else {
                    await Promise.reject(new Error(jsonData.message))
                }
            } catch (err) {
                await Promise.reject(err)
            }
        }

        if (bank !== undefined && productId !== undefined) {
            toast
                .promise(
                    putOrder(),
                    {
                        loading: 'Processing...',
                        success: 'Order succeed!',
                        error: 'Something went wrong!',
                    },
                    {
                        className: 'roboto',
                        position: 'top-right',
                    }
                )
                .catch(() => null)
        }
    }

    return (
        <>
            <div ref={overlayRef} className="modal pt-5 px-5">
                <div ref={innerRef} style={{ width: 325 }} className="modal-inner bg-white rounded-lg">
                    {/* Header */}
                    <div className="flex justify-between p-4 px-6">
                        <h3 className="text-gray-500 font-medium roboto">Choose method</h3>
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
                                handleClick('permata')
                            }}
                            className={`${
                                bank === 'permata' ? 'bg-blue-50 ring-2' : 'bg-gray-50 hover:bg-gray-100'
                            } cursor-pointer mb-2.5 rounded-md py-3 px-4 roboto text-gray-500 font-medium`}
                        >
                            <span>Permata Virtual account</span>
                        </div>
                        <div
                            onClick={() => {
                                handleClick('bca')
                            }}
                            className={`${
                                bank === 'bca' ? 'bg-blue-50 ring-2' : 'bg-gray-50 hover:bg-gray-100'
                            } cursor-pointer mb-2.5 rounded-md py-3 px-4 roboto text-gray-500 font-medium`}
                        >
                            <span>BCA Virtual account</span>
                        </div>
                        <div
                            onClick={() => {
                                handleClick('bri')
                            }}
                            className={` ${
                                bank === 'bri' ? 'bg-blue-50 ring-2' : 'bg-gray-50 hover:bg-gray-100'
                            } cursor-pointer mb-2.5 rounded-md py-3 px-4 roboto text-gray-500 font-medium`}
                        >
                            <span>BRI Virtual account</span>
                        </div>
                        <div
                            onClick={() => {
                                handleClick('bni')
                            }}
                            className={` ${
                                bank === 'bni' ? 'bg-blue-50 ring-2' : 'bg-gray-50 hover:bg-gray-100'
                            } cursor-pointer mb-2.5 rounded-md py-3 px-4 roboto text-gray-500 font-medium`}
                        >
                            <span>BNI Virtual account</span>
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
