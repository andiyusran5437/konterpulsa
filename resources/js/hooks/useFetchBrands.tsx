import { type BrandResponse } from '../types'

export const useFetchBrands = () => {
    const fetchOrders = async (page = 0, sort: string, status: string, search: string, perPage = 10): Promise<BrandResponse> => {
        page += 1
        const target = `${import.meta.env.VITE_API_URL}/brands?per_page=${perPage}&page=${page}&sort=${sort}&status=${status}&search=${search}`

        try {
            const response = await fetch(target)
            const jsonData: BrandResponse = await response.json()
            return await Promise.resolve(jsonData)
        } catch (err) {
            return await Promise.reject(err)
        }
    }

    return fetchOrders
}
