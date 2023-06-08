import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { toCurrency } from '../../../helpers'
import { type Product } from '../../../types'
import { Modal } from '../modal'

interface Props {
    selectedProduct: Product | null
    phoneNumber: string
}

export const Checkout: React.FC<Props> = ({ selectedProduct, phoneNumber }) => {
    const [paymentOpen, setPaymentOpen] = useState<boolean>(false)

    const handleClickPayment = () => {
        if (selectedProduct === null) {
            toast.error('Please select the product first!', {
                position: 'top-right',
                className: 'roboto',
            })

            return
        }

        const isLess = phoneNumber.length < 10
        if (!isLess) {
            setPaymentOpen((prev) => !prev)
        }
        if (isLess) {
            toast.error('Number must more than or equal to 10', {
                position: 'top-right',
                className: 'roboto',
            })
        }
    }

    return (
        <>
            <div className="flex justify-end mt-16 border-t border-t-slate-200">
                <div className="py-4 flex items-end justify-between gap-4 flex-1 mt-4">
                    <div className="flex flex-col items-start">
                        <span className="text-slate-500 roboto">Price</span>
                        <span className="roboto font-bold text-2xl text-teal-600">{toCurrency(selectedProduct?.price ?? 0, 'Rp')}</span>
                    </div>
                    <div>
                        <button
                            onClick={handleClickPayment}
                            className="outline-none w-full md:w-auto bg-teal-500 hover:bg-teal-600 text-white px-4 md:px-10 py-2 font-medium rounded-md roboto"
                        >
                            Choose Payment
                        </button>
                    </div>
                </div>
            </div>

            {paymentOpen ? <Modal phoneNumber={phoneNumber} credit={selectedProduct} setState={setPaymentOpen} /> : null}
        </>
    )
}
