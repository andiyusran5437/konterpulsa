import React, { useCallback, useState } from 'react'
import { toCurrency, toDate, toUpperFirst } from '../../../../helpers'
import { type Brand, type Product, type ProductRequestData, type ProductStatus } from '../../../../types'
import { ProductStatusModal } from '../../../organisms'
import { ProductForm } from '../../organisms'

interface Props {
    product: Product
    index: number
    onClickDelete: (id: number) => void
    onClickDetail: (product: Product) => void
    brands: Brand[]
}

export const ProductListing: React.FC<Props> = ({ product, index, onClickDetail, onClickDelete, brands }) => {
    const [statusModal, setStatusModal] = useState(false)
    const [productForm, setProductForm] = useState(false)
    const [productTemp, setProductTemp] = useState<ProductRequestData>()
    const isTemp = productTemp !== undefined
    const credit = isTemp ? productTemp.credit : product.credit
    const price = isTemp ? productTemp.price : product.price
    const stock = isTemp ? productTemp.stock : product.stock
    const [status, setStatus] = useState<ProductStatus>(product.status)
    const [updatedTime, setUpdatedTime] = useState(product.updated_at ?? 0)

    const createdTime = toDate(product.created_at)
    const [brand, setBrand] = useState<Brand | undefined>(product.brand)
    const getStatus = (): string => {
        return status
    }

    const handleEdit = useCallback(() => {
        setProductForm(true)
    }, [])

    const updateCallback = (item: ProductRequestData, brand: Brand) => {
        setProductTemp(item)
        setUpdatedTime(Math.round(Date.now() / 1000))
        setBrand(brand)
    }

    const handleDelete = useCallback(() => {
        onClickDelete(product.id)
    }, [])

    const handleStatusClick = useCallback(() => {
        setStatusModal(true)
    }, [])

    const setStatusCallback = useCallback((status: ProductStatus) => {
        setStatus(status)
        setUpdatedTime(Math.round(Date.now() / 1000))
    }, [])

    return (
        <tr>
            <td className="px-4 border-r border-b border-slate-200 py-2 text-center">{index}.</td>
            <td className="px-4 border-r border-b border-slate-200 py-2">{product.product_id}</td>
            <td className="px-4 border-r border-b border-slate-200 py-2">{brand?.name ?? <span className="text-gray-400">undefined</span>}</td>
            <td className="px-4 border-r border-b border-slate-200 py-2">{toCurrency(credit)}</td>
            <td className="px-4 border-r border-b border-slate-200 py-2">{toCurrency(price, 'Rp')}</td>
            <td className="px-4 border-r border-b border-slate-200 py-2">{toCurrency(stock)}</td>
            <td className="px-4 border-r border-b border-slate-200 py-2">{createdTime}</td>
            <td className="px-4 border-r border-b border-slate-200 py-2 !text-gray-400">
                <span className="cursor-pointer hover:text-gray-500" onClick={handleStatusClick}>
                    {toUpperFirst(getStatus())}
                </span>
            </td>
            <td className="px-4 border-r border-b border-slate-200 py-2 whitespace-nowrap w-10">
                <div className="text-center flex gap-1.5">
                    <button
                        onClick={() => {
                            onClickDetail({ ...product, stock, credit, price, updated_at: updatedTime, brand })
                        }}
                        className="outline-none bg-teal-600 hover:bg-teal-700 px-2 py-1.5 rounded-lg"
                    >
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.3646 8.76874C18.1508 5.28999 14.9117 3.28708 11.5 3.28708C9.79416 3.28708 8.13624 3.78541 6.62207 4.715C5.10791 5.65416 3.74707 7.02458 2.63541 8.76874C1.67707 10.2733 1.67707 12.7171 2.63541 14.2217C4.84916 17.71 8.08832 19.7033 11.5 19.7033C13.2058 19.7033 14.8637 19.205 16.3779 18.2754C17.8921 17.3362 19.2529 15.9658 20.3646 14.2217C21.3229 12.7267 21.3229 10.2733 20.3646 8.76874V8.76874ZM11.5 15.3717C9.35332 15.3717 7.62832 13.6371 7.62832 11.5C7.62832 9.36291 9.35332 7.62833 11.5 7.62833C13.6467 7.62833 15.3717 9.36291 15.3717 11.5C15.3717 13.6371 13.6467 15.3717 11.5 15.3717Z"
                                fill="white"
                            />
                            <path
                                d="M11.4981 8.75916C10.7725 8.75916 10.0765 9.04742 9.56342 9.56052C9.05032 10.0736 8.76205 10.7696 8.76205 11.4952C8.76205 12.2208 9.05032 12.9168 9.56342 13.4299C10.0765 13.943 10.7725 14.2312 11.4981 14.2312C13.0027 14.2312 14.2389 13.0046 14.2389 11.5C14.2389 9.9954 13.0027 8.75916 11.4981 8.75916V8.75916Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    <button onClick={handleEdit} className="outline-none text-white bg-yellow-600 hover:bg-yellow-700 px-2 py-1.5 rounded-lg">
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.125 21.0833H2.875C2.48208 21.0833 2.15625 20.7575 2.15625 20.3646C2.15625 19.9717 2.48208 19.6458 2.875 19.6458H20.125C20.5179 19.6458 20.8437 19.9717 20.8437 20.3646C20.8437 20.7575 20.5179 21.0833 20.125 21.0833ZM18.2275 3.33693C16.3683 1.47776 14.5475 1.42985 12.6404 3.33693L11.4808 4.49651C11.385 4.59235 11.3467 4.74568 11.385 4.87985C11.7515 6.13754 12.4293 7.28251 13.3556 8.20883C14.2819 9.13515 15.4269 9.81291 16.6846 10.1794C16.7525 10.2017 16.8253 10.2045 16.8947 10.1875C16.9641 10.1706 17.0274 10.1346 17.0775 10.0836L18.2275 8.92401C19.1763 7.98485 19.6362 7.07443 19.6362 6.15443C19.6458 5.20568 19.1858 4.28568 18.2275 3.33693V3.33693ZM14.9596 11.0496C14.6817 10.9154 14.4133 10.7813 14.1546 10.6279C13.9444 10.5027 13.7398 10.3684 13.5412 10.2254C13.3783 10.12 13.1867 9.96668 13.0046 9.81335C12.9459 9.77059 12.8914 9.72247 12.8417 9.6696C12.5254 9.40126 12.1708 9.05626 11.8546 8.67293C11.8258 8.65376 11.7779 8.58668 11.7108 8.50043C11.615 8.38543 11.4521 8.19376 11.3083 7.97335C11.1717 7.7931 11.0469 7.60424 10.9346 7.40793C10.7812 7.14918 10.6471 6.89043 10.5129 6.6221C10.493 6.57918 10.4735 6.53606 10.4545 6.49272C10.3126 6.1736 9.89575 6.08064 9.64946 6.32693L4.15917 11.8172C4.03458 11.9418 3.91958 12.1814 3.89083 12.3443L3.37333 16.0147C3.2775 16.6664 3.45958 17.2797 3.86208 17.6918C4.20708 18.0272 4.68625 18.2093 5.20375 18.2093C5.31875 18.2093 5.43375 18.1997 5.54875 18.1806L9.22875 17.6631C9.40125 17.6343 9.64083 17.5193 9.75583 17.3947L15.2394 11.9121C15.4886 11.6629 15.3937 11.2365 15.0707 11.0975C15.0337 11.0816 14.9966 11.0657 14.9596 11.0496V11.0496Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <button onClick={handleDelete} className="outline-none text-white hover:text-gray-200 bg-red-700 hover:bg-red-800 px-2 py-1.5 rounded-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21.07 5.23C19.46 5.07 17.85 4.95 16.23 4.86V4.85L16.01 3.55C15.86 2.63 15.64 1.25 13.3 1.25H10.68C8.35001 1.25 8.13 2.57 7.97 3.54L7.76 4.82C6.83 4.88 5.9 4.94 4.97 5.03L2.93001 5.23C2.51001 5.27 2.21 5.64 2.25 6.05C2.29 6.46 2.65 6.76 3.07 6.72L5.11001 6.52C10.35 6 15.63 6.2 20.93 6.73H21.01C21.39 6.73 21.72 6.44 21.76 6.05C21.7751 5.85024 21.7113 5.65253 21.5823 5.49925C21.4533 5.34596 21.2694 5.24931 21.07 5.23V5.23ZM19.23 8.14C18.99 7.89 18.66 7.75 18.32 7.75H5.68C5.34 7.75 5 7.89 4.77 8.14C4.54 8.39 4.41 8.73 4.43 9.08L5.05001 19.34C5.16001 20.86 5.3 22.76 8.79 22.76H15.21C18.7 22.76 18.84 20.87 18.95 19.34L19.57 9.09C19.59 8.73 19.46 8.39 19.23 8.14V8.14ZM13.66 17.75H10.33C9.92 17.75 9.58 17.41 9.58 17C9.58 16.59 9.92 16.25 10.33 16.25H13.66C14.07 16.25 14.41 16.59 14.41 17C14.41 17.41 14.07 17.75 13.66 17.75ZM14.5 13.75H9.5C9.09 13.75 8.75 13.41 8.75 13C8.75 12.59 9.09 12.25 9.5 12.25H14.5C14.91 12.25 15.25 12.59 15.25 13C15.25 13.41 14.91 13.75 14.5 13.75Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>

                    {productForm ? (
                        <ProductForm
                            id={product.id}
                            isEdit
                            product={product}
                            brandTemp={brand}
                            productTemp={productTemp}
                            updateCallback={updateCallback}
                            brands={brands}
                            setState={setProductForm}
                        />
                    ) : null}
                    {statusModal ? <ProductStatusModal defaultStatus={status} setStatusCallback={setStatusCallback} id={product.id} setState={setStatusModal} /> : null}
                </div>
            </td>
        </tr>
    )
}
