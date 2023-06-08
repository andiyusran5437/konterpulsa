import React from 'react'
import { type Product } from '../../../types'
import { CreditListing } from '../../molecules'

interface Props {
    credits: Product[]
    clickCallback: (credit: Product) => void
    selectedProduct: Product | null
}

export const CreditList: React.FC<Props> = ({ credits, selectedProduct, clickCallback }) => {
    return (
        <>
            <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {credits.map((credit, i) => (
                    <CreditListing selectedProduct={selectedProduct} clickCallback={clickCallback} product={credit} key={i} />
                ))}
            </div>
        </>
    )
}
