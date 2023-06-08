import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BrandFilter, BrandForm, BrandList, Search } from '../../../components/admin'
import { Pagination } from '../../../components/organisms'
import { useFetchBrands } from '../../../hooks'
import { type Brand } from '../../../types'

export const Brands: React.FC = () => {
    const [brands, setBrands] = useState<Brand[]>([])
    const [total, setTotal] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [showFilter, setShowFilter] = useState(false)
    const [form, setForm] = useState(false)
    const [reloadCount, setReloadCount] = useState(0)
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page') ?? '0')
    const sort = searchParams.get('sort') ?? 'desc'
    const status = searchParams.get('status') ?? 'none'
    const search = searchParams.get('search') ?? ''

    const searchCallback = (keyword: string) => {
        searchParams.set('search', keyword)
        const params = searchParams.toString()
        navigate({
            pathname: '/admin/brands',
            search: `?${params}`,
        })
    }

    const paginationCallback = useCallback((params: string) => {
        navigate({
            pathname: '/admin/brands',
            search: `?${params}`,
        })
    }, [])

    const fetchBrands = useFetchBrands()

    useEffect(() => {
        toast
            .promise(
                fetchBrands(page, sort, status, search),
                {
                    success: 'Brands data is loaded',
                    error: 'Something went wrong!',
                    loading: 'Loading Brands...',
                },
                { className: 'roboto', position: 'top-right' }
            )
            .then((res) => {
                const data = res.data
                const total = res.total
                const perPage = res.per_page
                const pages = Math.ceil(total / perPage)
                setTotal(pages)
                setPerPage(perPage)
                setBrands(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [page, sort, status, search, reloadCount])

    return (
        <div>
            <div className="pt-4">
                <div className="bg-white pt-4 pb-2 px-10 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-500 mb-6 mt-2 roboto">Order Listing</h1>

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-5">
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setForm(true)
                                }}
                                className="outline-none bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1.5 rounded-md font-medium roboto whitespace-nowrap mb-4 lg:mb-0 flex items-center justify-center lg:justify-start"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12H18M12 18V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                onClick={() => {
                                    setShowFilter(true)
                                }}
                                className="outline-none bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md font-medium roboto whitespace-nowrap mb-4 lg:mb-0 flex items-center justify-center lg:justify-start"
                            >
                                Filter viewing
                            </button>
                        </div>
                        <Search callback={searchCallback} title="Enter the keyword" placeholder="Enter key to search" />
                    </div>
                    <div className="bg-white overflow-auto rounded-lg border mb-5">
                        <BrandList setReloadCount={setReloadCount} perPage={perPage} brands={brands} />
                    </div>
                    <div>
                        <Pagination onPageChangeCallback={paginationCallback} pageCount={total} />
                    </div>
                </div>
            </div>
            {showFilter ? <BrandFilter setState={setShowFilter} /> : null}
            {form ? <BrandForm setReloadCount={setReloadCount} setState={setForm} /> : null}
        </div>
    )
}
