import { type BrandStatus } from './status'

export interface Brand {
    id: number
    brand_id: number
    name: string
    prefix: string[]
    status: BrandStatus
    created_at: number
}

export interface BrandResponse {
    data: Brand[]
    total: number
    per_page: number
}

export interface BrandRequestPostPayload {
    brand?: string
    prefix?: string[]
    status?: BrandStatus
}

export interface BrandPostRequest {
    id?: number
    isEdit?: boolean
    brand?: BrandRequestPostPayload
}

export interface BrandStatusRequest {
    status: string
}
