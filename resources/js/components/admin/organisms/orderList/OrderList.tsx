import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { type Order } from '../../../../types'
import { AdminOrderListing } from '../../molecules'
import { AdminOrderDetail } from '../orderDetail'

interface Props {
    orders: Order[]
    setReloadCount: React.Dispatch<React.SetStateAction<number>>
}

export const AdminOrderList: React.FC<Props> = ({ orders, setReloadCount }) => {
    const [showDetail, setShowDetail] = useState(false)
    const [order, setOrder] = useState<Order>()
    const [searchParams] = useSearchParams()
    const page = searchParams.get('page') ?? '0'
    const perPage = 10
    const startIndex = parseInt(page) * perPage

    const callback = useCallback((order: Order) => {
        setOrder(order)
        setShowDetail(true)
    }, [])

    return (
        <>
            <table className="w-full table table-nohover">
                <thead>
                    <tr>
                        <th className="text-center px-4 border-r py-3 w-16 whitespace-nowrap">No.</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Order ID</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Balance</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Price</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Phone Number</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Status</th>
                        <th className="text-center px-4 border-r py-3 whitespace-nowrap">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, i) => (
                        <AdminOrderListing callback={callback} index={startIndex + (i + 1)} order={order} key={order.id} />
                    ))}
                </tbody>
            </table>

            {showDetail ? <AdminOrderDetail setReloadCount={setReloadCount} order={order} setState={setShowDetail} /> : null}
        </>
    )
}
