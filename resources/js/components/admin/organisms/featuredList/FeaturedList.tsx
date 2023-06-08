import React from 'react'
import { Link } from 'react-router-dom'
import { Featured } from '../../molecules'

interface Props {
    orders: string
    newOrder: string
    pending: string
    confirmation: string
}

export const FeaturedList: React.FC<Props> = ({ orders, newOrder, pending, confirmation }) => {
    return (
        <div className={`grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 pt-5`}>
            <Link className="cursor-pointer" to="/admin/orders">
                <Featured icon="url('/app-icon/book-filled.svg')" color="#94a3b8" title="Orders" subTitle={orders} />
            </Link>
            <Link className="cursor-pointer" to="/admin/orders?sort=desc">
                <Featured icon="url('/app-icon/task.svg')" color="#84cc16" title="New Orders" subTitle={newOrder} />
            </Link>
            <Link className="cursor-pointer" to="/admin/orders?sort=desc&status=pending">
                <Featured icon="url('/app-icon/receipt-filled.svg')" color="#eab308" title="Orders Pending" subTitle={pending} />
            </Link>
            <Link className="cursor-pointer" to="/admin/orders?sort=desc&status=settlement">
                <Featured icon="url('/app-icon/task-featured.svg')" color="#16a34a" title="Orders Confirmation" subTitle={confirmation} />
            </Link>
        </div>
    )
}
