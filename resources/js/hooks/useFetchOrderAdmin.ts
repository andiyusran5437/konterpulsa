import { type OrderResponse } from '../types'

export const useFetchOrderAdmin = () => {
    const fetchOrder = async (page = 0, sort = 'desc', status = 'none', search = ''): Promise<OrderResponse> => {
        page += 1

        const target = `${import.meta.env.VITE_API_URL}/orders?page=${page}&search=${search}&sort=${sort}&status=${status}`
        try {
            const response = await fetch(target)
            const jsonData: OrderResponse = await response.json()
            return await Promise.resolve(jsonData)
        } catch (err) {
            return await Promise.reject(err)
        }
    }

    return fetchOrder
}
