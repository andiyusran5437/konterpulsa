import React from 'react'
import { toCurrency } from '../../../helpers'
import { type Product } from '../../../types'

interface Props {
    product: Product
    clickCallback: (credit: Product) => void
    selectedProduct: Product | null
}

export const CreditListing: React.FC<Props> = ({ product, clickCallback, selectedProduct }) => {
    const isActive = selectedProduct?.id === product.id

    const handleClick = () => {
        clickCallback(product)
    }

    return (
        <>
            <div
                onClick={handleClick}
                className={`border cursor-pointer text-center rounded-md py-4 px-6 ${isActive ? 'border-teal-500 ring-1 ring-teal-400' : 'border-slate-200'}`}
            >
                <div className="font-bold roboto text-2xl text-teal-600 select-none">{toCurrency(product.credit, 'Rp')}</div>
                <div className="text-sm mt-1 roboto text-slate-500 select-none">Bayar: {toCurrency(product.price, 'Rp')}</div>
            </div>
        </>
    )
}
