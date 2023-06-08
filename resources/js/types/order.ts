import { type Product } from './product'

export interface Order {
    id: number
    order_id: string
    phone_number: string
    status: string
    product_copy: Product
    bank: string
    va: string
    created_at: number
    settlement_time: number
    expired_at: number
    updated_at: number
}

export interface OrderResponse {
    data: Order[]
    total: number
    per_page: number
}
