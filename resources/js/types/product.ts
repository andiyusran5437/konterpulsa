import { type Brand } from './brand'
import { type ProductStatus } from './status'

export interface Product {
    id: number
    product_id: number
    brand_id: number
    credit: number
    price: number
    stock: number
    status: ProductStatus
    brand?: Brand
    created_at: number
    updated_at?: number
}

export interface ProductResponse {
    data: Product[]
    total: number
    per_page: number
}

export interface ProductRequestData {
    brand_id: number
    credit: number
    price: number
    stock: number
}

export interface ProductRequest {
    id?: number
    isEdit?: boolean
    product: ProductRequestData
}

export interface ProductStatusRequest {
    status: string
}
