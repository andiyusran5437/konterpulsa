import React from 'react'
import { type Order } from '../../../types'
import { OrderListing } from '../../molecules'

interface Props {
    orders: Order[]
}

export const OrderList: React.FC<Props> = ({ orders }) => {
    return (
        <div className="py-4 w-full lg:w-1/2 xl:w-1/2 md:w-2/3 relative flex items-center flex-wrap">
            <div className="grid grid-cols-1 gap-7 flex-1">
                {orders.map((order, i) => (
                    <OrderListing order={order} key={i} />
                ))}
            </div>
        </div>
    )
}
