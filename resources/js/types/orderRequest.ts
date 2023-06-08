export interface OrderRequest {
    product_id: number
    payment: {
        bank: string
    }
    phone_number: string
}
