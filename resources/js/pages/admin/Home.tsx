import React, { useEffect, useState } from 'react'
import { FeaturedList } from '../../components/admin'
import { toCurrency } from '../../helpers'
import { useFetchOrderCount } from '../../hooks'

export const AdminHome: React.FC = () => {
    const [orders, setOrders] = useState(0)
    const [newOrders, setNewOrders] = useState(0)
    const [pending, setPending] = useState(0)
    const [settlement, setSettlement] = useState(0)

    const fetchNewOrders = useFetchOrderCount()
    useEffect(() => {
        fetchNewOrders('')
            .then((count) => {
                if (count > 0) setOrders(count)
            })
            .catch(() => null)
        fetchNewOrders('new')
            .then((count) => {
                if (count > 0) setNewOrders(count)
            })
            .catch(() => null)
        fetchNewOrders('pending')
            .then((count) => {
                if (count > 0) setPending(count)
            })
            .catch(() => null)
        fetchNewOrders('settlement')
            .then((count) => {
                if (count > 0) setSettlement(count)
            })
            .catch(() => null)
    }, [])

    return (
        <div>
            <div>
                <FeaturedList orders={toCurrency(orders)} newOrder={toCurrency(newOrders)} pending={toCurrency(pending)} confirmation={toCurrency(settlement)} />
            </div>
        </div>
    )
}
