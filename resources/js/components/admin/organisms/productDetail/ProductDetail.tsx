import React, { useRef } from 'react'
import { toCurrency, toDate } from '../../../../helpers'
import { useClickOutside, useCloseModal } from '../../../../hooks'
import { type Product, type BrandPostRequest, type BrandRequestPostPayload } from '../../../../types'

interface Props extends BrandPostRequest {
    setState: React.Dispatch<React.SetStateAction<boolean>>
    setReloadCount?: React.Dispatch<React.SetStateAction<number>>
    updateCallback?: (brand: BrandRequestPostPayload) => void
    product?: Product
}

export const ProductDetail: React.FC<Props> = ({ setState, product }) => {
    const overlayRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)

    const handleClose = useCloseModal(setState)
    useClickOutside(overlayRef, innerRef, setState)

    const brand = product?.brand
    let updatedTime = ''
    const updateAt = product?.updated_at
    const isUpdatedExists = updateAt !== null && updateAt !== undefined
    if (isUpdatedExists) {
        updatedTime = toDate(updateAt)
    }

    return (
        <div ref={overlayRef} className="modal pt-5 px-5">
            <div ref={innerRef} style={{ width: 325 }} className="modal-inner bg-white rounded-lg">
                {/* Header */}
                <div className="flex justify-between p-4 px-6">
                    <h3 className="text-gray-500 font-medium roboto">Product Details</h3>
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
                <div className="px-6 pb-5 pt-4 roboto flex flex-col gap-2.5">
                    <div className="flex items-center justify-between pb-2.5 border-b border-dashed">
                        <span className="text-sm font-medium text-gray-500">Brand Name:</span>
                        <span className="ml-2 text-sm text-gray-400">{brand?.name ?? 'undefined'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Product ID:</span>
                        <span className="ml-2 text-sm text-gray-400">{product?.product_id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Balance:</span>
                        <span className="ml-2 text-sm text-gray-400">{toCurrency(product?.credit ?? 0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Stock:</span>
                        <span className="ml-2 text-sm text-gray-400">{toCurrency(product?.stock ?? 0)}</span>
                    </div>
                    {isUpdatedExists ? (
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Updated at:</span>
                            <span className="ml-2 text-sm text-gray-400">{updatedTime}</span>
                        </div>
                    ) : null}
                    <div className="flex items-center justify-between pt-2.5 border-t border-dashed">
                        <span className="font-semibold text-gray-500">Final Price:</span>
                        <span className="ml-2 font-semibold text-gray-500">{toCurrency(5500 ?? 0, 'Rp')}</span>
                    </div>
                </div>
                {/* footer */}
            </div>
        </div>
    )
}
