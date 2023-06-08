import { format } from 'libphonenumber-js'
import React, { useCallback, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { toCurrency, toDate, toUpperFirst } from '../../../../helpers'
import { useClickOutside, useCloseModal, useExpTime } from '../../../../hooks'
import { type Order, type Status } from '../../../../types'

interface Props {
    setState: React.Dispatch<React.SetStateAction<boolean>>
    order?: Order
    setReloadCount: React.Dispatch<React.SetStateAction<number>>
}

export const AdminOrderDetail: React.FC<Props> = ({ setState, order, setReloadCount }) => {
    const overlayRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const handleClose = useCloseModal(setState)
    const status = (order?.status ?? 'none') as Status
    const product = order?.product_copy
    const settledTime = order?.settlement_time
    let settlementTime = ''
    if (settledTime !== null) {
        settlementTime = toDate(order?.settlement_time ?? 0)
    }
    const orderTime = toDate(order?.created_at ?? 0)

    const isExp = useExpTime(order?.expired_at ?? 0)

    const getStatus = (): Status => {
        if (isExp && status === 'pending') return 'expired'
        return status
    }

    useClickOutside(overlayRef, innerRef, setState)

    const handleMark = useCallback(() => {
        const target = `${import.meta.env.VITE_API_URL}/orders/${order?.id ?? 0}/done`
        const doMarkDone = async () => {
            try {
                await fetch(target)
            } catch (err) {
                return await Promise.reject(err)
            }
        }

        toast
            .promise(
                doMarkDone(),
                {
                    loading: 'Processing...',
                    success: 'Marked as done!',
                    error: 'Something went wrong!',
                },
                { className: 'roboto', position: 'top-right' }
            )
            .then(() => {
                setReloadCount((prev) => prev + 1)
                setState(false)
            })
            .catch(() => null)
    }, [])

    return (
        <div ref={overlayRef} className="modal pt-5 px-5">
            <div ref={innerRef} style={{ width: 325 }} className="modal-inner bg-white rounded-lg">
                {/* Header */}
                <div className="flex justify-between p-4 px-6">
                    <h3 className="text-gray-500 font-medium roboto">Order information</h3>
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
                <div className="px-6 pb-5 pt-4 roboto flex flex-col gap-2.5">
                    <div className="flex items-center justify-between pb-2.5 border-b border-dashed">
                        <span className="text-sm font-medium text-gray-500">Payment Method:</span>
                        <span className="ml-2 text-sm text-gray-400">{order?.bank}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Va Number:</span>
                        <span className="ml-2 text-sm text-gray-400">{order?.va}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Phone Number:</span>
                        <span className="ml-2 text-sm text-gray-400">{format(order?.phone_number ?? '', 'ID', 'INTERNATIONAL')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Order Time:</span>
                        <span className="ml-2 text-sm text-gray-400">{orderTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Status:</span>
                        <span className="ml-2 text-sm text-gray-400">{toUpperFirst(getStatus())}</span>
                    </div>
                    {status === 'settlement' ? (
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Payment Time:</span>
                            <span className="ml-2 text-sm text-gray-400">{settlementTime}</span>
                        </div>
                    ) : null}
                    <div className="flex items-center justify-between pt-2.5 border-t border-dashed">
                        <span className="font-semibold text-gray-500">Total:</span>
                        <span className="ml-2 font-semibold text-gray-500">{toCurrency(product?.price ?? 0, 'Rp')}</span>
                    </div>
                </div>
                {/* footer */}
                {status === 'settlement' ? (
                    <div className="px-5 pb-4 flex justify-center flex-col">
                        <button onClick={handleMark} className={`roboto bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2 text-white mb-2`}>
                            Mark as done
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
