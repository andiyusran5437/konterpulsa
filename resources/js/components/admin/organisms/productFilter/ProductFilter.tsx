import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useClickOutside, useCloseModal } from '../../../../hooks'
import { type ProductStatus } from '../../../../types'

interface Props {
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProductFilter: React.FC<Props> = ({ setState }) => {
    const [sort, setSort] = useState('desc')
    const [status, setStatus] = useState<ProductStatus>('none')
    const overlayRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const [searchParams] = useSearchParams()
    const sortParam = searchParams.get('sort')
    const statusParam = searchParams.get('status') as ProductStatus
    useEffect(() => {
        if (sortParam !== null) setSort(sortParam)
        if (statusParam !== null) setStatus(statusParam ?? 'none')
    }, [])

    const handleSort = (value: string) => {
        setSort(value)
    }

    const handleStatus = (value: ProductStatus) => {
        setStatus(value)
    }

    const handleClose = useCloseModal(setState)
    const navigate = useNavigate()
    const handleSubmit = () => {
        searchParams.set('sort', sort)
        searchParams.set('status', status)
        const params = searchParams.toString()
        navigate({
            pathname: '/admin/products',
            search: params,
        })
    }

    useClickOutside(overlayRef, innerRef, setState)

    return (
        <div className="modal pt-5 px-5" ref={overlayRef}>
            <div style={{ width: 300 }} className="modal-inner bg-white rounded-lg" ref={innerRef}>
                {/* header */}
                <div className="flex justify-between p-4 px-5">
                    <h3 className="roboto text-gray-500 font-medium text-base">Filter tampilan</h3>
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
                <div className="px-7 pt-2 pb-2">
                    <div>
                        <span className="roboto font-medium text-gray-500 mb-2 flex">Order by:</span>
                        <div className="inline-flex items-center">
                            <input
                                onChange={() => {
                                    handleSort('desc')
                                }}
                                checked={sort === 'desc'}
                                type="radio"
                                value={'newest'}
                                className="w-4 h-4"
                                name="orderby"
                            />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">Newest</span>
                        </div>
                        <div className="inline-flex items-center ml-5">
                            <input
                                onChange={() => {
                                    handleSort('asc')
                                }}
                                checked={sort === 'asc'}
                                type="radio"
                                value={'oldest'}
                                className="w-4 h-4"
                                name="orderby"
                            />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">Oldest</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <span className="roboto font-medium text-gray-500 mb-2 flex">Status type:</span>
                        <div className="inline-flex items-center mr-5 mb-3">
                            <input
                                onChange={() => {
                                    handleStatus('none')
                                }}
                                checked={status === 'none'}
                                type="radio"
                                value={'all'}
                                className="w-4 h-4"
                                name="status"
                            />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">None</span>
                        </div>
                        <div className="inline-flex items-center mr-5 mb-3">
                            <input
                                onChange={() => {
                                    handleStatus('hold')
                                }}
                                checked={status === 'hold'}
                                type="radio"
                                value={'all'}
                                className="w-4 h-4"
                                name="status"
                            />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">Hold</span>
                        </div>
                        <div className="inline-flex items-center mr-5 mb-3">
                            <input
                                onChange={() => {
                                    handleStatus('sold')
                                }}
                                checked={status === 'sold'}
                                type="radio"
                                value={'all'}
                                className="w-4 h-4"
                                name="status"
                            />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">Sold</span>
                        </div>
                        <div className="inline-flex items-center mr-5 mb-3">
                            <input
                                onChange={() => {
                                    handleStatus('active')
                                }}
                                checked={status === 'active'}
                                type="radio"
                                value={'all'}
                                className="w-4 h-4"
                                name="status"
                            />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">Active</span>
                        </div>
                    </div>
                </div>

                {/* footer */}
                <div className="px-5 py-4 flex justify-center flex-col">
                    <button onClick={handleSubmit} className={`roboto font-medium bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2 text-white`}>
                        Simpan
                    </button>
                    <button
                        onClick={handleClose}
                        className="roboto font-medium bg-white border border-gray-200 hover:border-gray-300 mt-1.5 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md px-3 py-2"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}
