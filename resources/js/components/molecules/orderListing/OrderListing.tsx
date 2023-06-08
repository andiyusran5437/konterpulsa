import React, { useState } from 'react'
import { toCurrency, toUpperFirst } from '../../../helpers'
import { useCancelOrder, useExpTime } from '../../../hooks'
import { type Order, type Status } from '../../../types'
import { OrderDetail } from '../../organisms'

interface Props {
    order: Order
}

export const OrderListing: React.FC<Props> = ({ order }) => {
    const [detailOpen, setDetailOpen] = useState<boolean>(false)
    const [, setCancelStatus] = useState<boolean>(false)
    const status = order.status as Status
    const layout: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }

    const product = order.product_copy
    const trxTimeUnix: number = order.created_at
    const expTimeUnix: number = order.expired_at
    const trxTime = new Date(trxTimeUnix * 1000)
    const formattedTrxTime = trxTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    const expTime = new Date(expTimeUnix * 1000)
    const formattedExpTime = expTime.toLocaleDateString('en-US', layout)
    const createdTimeUnix = order.updated_at
    // succed time
    const succedTime = new Date(createdTimeUnix * 1000)
    const formatedSucceedTime = succedTime.toLocaleDateString('en-US', layout)

    // settelement time
    const settlementUnix = order.settlement_time ?? 0
    const settlementTime = new Date(settlementUnix * 1000)
    const formatedSettlementTime = settlementTime.toLocaleDateString('en-US', layout)
    const isExp = useExpTime(order.expired_at)

    let selectedPayStatusDate = formattedExpTime
    let selectedPayPrefix = 'Pay before'
    if (status === 'succeed') {
        console.log('succeed')
        selectedPayPrefix = 'Succeed on'
        selectedPayStatusDate = formatedSucceedTime
    }

    if (status === 'cancel') {
        const updatedUnix = order.updated_at ?? 0
        const updatedTime = new Date(updatedUnix * 1000)
        const formattedUpdated = updatedTime.toLocaleDateString('en-US', layout)
        selectedPayPrefix = 'Canceled on'
        selectedPayStatusDate = formattedUpdated
    } else if ((status === 'expired' || isExp) && status !== 'succeed' && status !== 'settlement') {
        selectedPayPrefix = 'Expired on'
    }

    if (status === 'settlement') {
        selectedPayPrefix = 'Settlement on'
        selectedPayStatusDate = formatedSettlementTime
    }

    const getStatus = (): Status => {
        if (isExp && status === 'pending') return 'expired'
        return status
    }

    const shownCancel = status === 'pending' && !isExp

    const handleCancel = useCancelOrder(order.id, setCancelStatus)

    return (
        <>
            <div className="flex-1 overflow-hidden p-5 border border-gray-100 rounded-lg shadow-[0_3px_5px_rgba(0,0,0,.05)]">
                {/* Top */}
                <div className="flex flex-wrap items-center justify-between">
                    <div className="roboto flex items-center gap-2 whitespace-nowrap">
                        <span className="text-gray-500 font-semibold">Pulsa</span>
                        <span className="text-sm text-gray-500">{formattedTrxTime}</span>
                    </div>
                    <div className="roboto whitespace-nowrap flex">
                        <span className="text-gray-500 text-sm">{selectedPayPrefix}:</span>
                        <span className="text-orange-500 text-sm ml-2 font-medium">{selectedPayStatusDate}</span>
                    </div>
                </div>
                {/* Center */}
                <div className="mt-4 gap-4 grid xl:grid-cols-12">
                    <div className="flex items-center gap-4 col-span-5">
                        <div className="border w-11 h-11 p-2 rounded">
                            <img className="w-full hidden xl:flex" src={`${order.bank}.png`} alt="" />
                        </div>
                        <div>
                            <div className="roboto text-sm text-gray-500 whitespace-nowrap">Payment Method</div>
                            <div className="roboto mt-1 text-gray-500 font-semibold">{toUpperFirst(order.bank)}</div>
                        </div>
                    </div>
                    <div className="flex flex-1 xl:gap-4 col-span-4 items-center">
                        <div className="w-1 h-8 border-l hidden xl:flex"></div>
                        <div>
                            <div className="roboto text-sm text-gray-500">Virtual Account Number</div>
                            <div className="roboto mt-1 text-gray-500 font-semibold">{order.va}</div>
                        </div>
                    </div>
                    <div className="flex items-center xl:gap-4 col-span-3">
                        <div className="w-1 h-8 border-l hidden xl:flex"></div>
                        <div>
                            <div className="roboto text-sm text-gray-500 whitespace-nowrap">Payment Total</div>
                            <div className="roboto mt-1 text-gray-500 font-semibold">{toCurrency(product.price, 'Rp')}</div>
                        </div>
                    </div>
                </div>
                {/* Bottom */}
                <div className="mt-8 border-gray-100">
                    <div className="flex flex-col xl:flex-row justify-center xl:justify-between xl:items-center gap-2.5">
                        <div className="flex items-center gap-1.5 roboto">
                            <span className="text-gray-500 text-sm font-medium">Status:</span>
                            <span className="text-teal-600 text-sm font-medium">{toUpperFirst(getStatus())}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {shownCancel ? (
                                <button
                                    onClick={handleCancel}
                                    className="w-full outline-none text-sm font-medium roboto border border-gray-300 px-4 py-1.5 rounded text-gray-400 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            ) : null}
                            <button
                                onClick={() => {
                                    setDetailOpen(true)
                                }}
                                className="w-full whitespace-nowrap outline-none text-sm font-medium roboto border border-sky-500 bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded"
                            >
                                See more
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {detailOpen ? <OrderDetail isExp={isExp} order={order} setState={setDetailOpen} /> : null}
        </>
    )
}
