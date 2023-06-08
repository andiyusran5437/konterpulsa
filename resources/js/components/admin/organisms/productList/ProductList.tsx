import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDeleteProdcut } from '../../../../hooks'
import { type Brand, type Product } from '../../../../types'
import { ProductListing } from '../../molecules'
import { Confirm } from '../confirm'
import { ProductDetail } from '../productDetail'

interface Props {
    products: Product[]
    perPage: number
    setReloadCount?: React.Dispatch<React.SetStateAction<number>>
    brands: Brand[]
}

export const ProductList: React.FC<Props> = ({ products, perPage, setReloadCount, brands }) => {
    const [detailModal, setDetailModal] = useState(false)
    const [product, setProduct] = useState<Product>()
    const [confirm, setConfirm] = useState(false)
    const [id, setId] = useState<number>(0)

    const [searchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page') ?? '0')
    const startIndex = page * perPage

    const onClickDetail = useCallback((product: Product) => {
        setDetailModal(true)
        setProduct(product)
    }, [])

    const onClickDelete = useCallback((id: number) => {
        setId(id)
        setConfirm(true)
    }, [])

    const deleteProduct = useDeleteProdcut()
    const handleDelete = useCallback(() => {
        deleteProduct(id)
            .then(() => {
                setConfirm(false)
                if (setReloadCount !== undefined) setReloadCount((prev) => prev + 1)
            })
            .catch(() => null)
    }, [id])

    return (
        <>
            <table className="w-full table table-nohover">
                <thead>
                    <tr>
                        <th className="text-center px-4 border-r py-3 w-16 whitespace-nowrap">No.</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Product ID</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Vendor</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Balance</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Price</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Stock</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Created Time</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Status</th>
                        <th className="text-center px-4 border-r py-3 whitespace-nowrap">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product, i) => (
                        <ProductListing
                            brands={brands}
                            onClickDelete={onClickDelete}
                            onClickDetail={onClickDetail}
                            product={product}
                            key={product.id}
                            index={startIndex + (i + 1)}
                        />
                    ))}
                </tbody>
            </table>

            {detailModal ? <ProductDetail product={product} setState={setDetailModal} /> : null}
            {confirm ? (
                <Confirm onConfirm={handleDelete} message="Are you sure want to delete" className="text-center text-gray-500 text-lg font-medium roboto" setState={setConfirm} />
            ) : null}
        </>
    )
}
