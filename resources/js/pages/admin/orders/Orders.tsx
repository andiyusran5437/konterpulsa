import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AdminOrderList, OrderFilter, Search } from '../../../components/admin'
import { Pagination } from '../../../components/organisms'
import { useFetchOrderAdmin } from '../../../hooks'
import { type Order } from '../../../types'

export const AdminOrders: React.FC = () => {
    const [searchParams] = useSearchParams()
    const page = searchParams.get('page') ?? 0
    const sort = searchParams.get('sort') ?? 'desc'
    const status = searchParams.get('status') ?? ''
    const pageNum = parseInt(page.toString())
    const search = searchParams.get('search') ?? ''
    const [reloadCount, setReloadCount] = useState(0)

    const [orders, setOrders] = useState<Order[]>([])
    const [total, setTotal] = useState(0)
    const [showFilter, setShowFilter] = useState(false)

    const navigate = useNavigate()

    const fetchOrder = useFetchOrderAdmin()
    useEffect(() => {
        toast
            .promise(
                fetchOrder(pageNum, sort, status, search),
                {
                    success: 'Orders data is loaded',
                    error: 'Something went wrong!',
                    loading: 'Loading order...',
                },
                { className: 'roboto', position: 'top-right' }
            )
            .then((res) => {
                const data = res.data
                const dataTotal = res.total
                const perPage = res.per_page
                setOrders(data)
                const pages = Math.ceil(dataTotal / perPage)
                setTotal(pages)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [pageNum, search, sort, status, reloadCount])

    const searchCallback = (keyword: string) => {
        searchParams.set('search', keyword)
        const params = searchParams.toString()
        navigate({
            pathname: '/admin/orders',
            search: `?${params}`,
        })
    }

    const paginateCallback = useCallback((params: string) => {
        navigate({
            pathname: '/admin/orders',
            search: `?${params}`,
        })
    }, [])

    return (
        <div>
            <div className="pt-4">
                <div className="bg-white pt-4 pb-2 px-10 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-500 mb-6 mt-2 roboto">Order Listing</h1>

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-5">
                        <button
                            onClick={() => {
                                setShowFilter(true)
                            }}
                            className="outline-none bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md font-medium roboto whitespace-nowrap mb-4 lg:mb-0 flex items-center justify-center lg:justify-start"
                        >
                            Filter viewing
                        </button>
                        <Search callback={searchCallback} title="Enter the keyword" placeholder="Enter key to search" />
                    </div>
                    <div className="bg-white overflow-auto rounded-lg border-l border-r border-b mb-5">
                        <AdminOrderList setReloadCount={setReloadCount} orders={orders} />
                    </div>
                    <div>
                        <Pagination onPageChangeCallback={paginateCallback} pageCount={total} />
                    </div>
                </div>
            </div>
            {showFilter ? <OrderFilter setState={setShowFilter} /> : null}
        </div>
    )
}
