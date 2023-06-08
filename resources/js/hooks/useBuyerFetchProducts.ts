import { type ProductResponse } from '../types'

interface FetchProps {
    page?: number
    prefix: string
}

export const useBuyerFetchProducts = () => {
    const fetchProduct = async ({ page = 0, prefix }: FetchProps): Promise<ProductResponse> => {
        page += 1

        const target = `${import.meta.env.VITE_API_URL}/products?page=${page}&prefix=${prefix}&status=active`

        try {
            const response = await fetch(target)
            const jsonData: ProductResponse = await response.json()

            return await Promise.resolve(jsonData)
        } catch (err) {
            return await Promise.reject(err)
        }
    }

    return fetchProduct
}
