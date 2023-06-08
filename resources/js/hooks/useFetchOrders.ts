import { type OrderResponse } from '../types'

export const useFetchOrders = () => {
    const baseURL = import.meta.env.VITE_API_URL

    const fetchOrders = async (numberToTrack: string): Promise<OrderResponse> => {
        const target = `${baseURL}/orders?phone=${numberToTrack}&status=none`

        try {
            const response = await fetch(target, {
                headers: {
                    Accept: 'application/json',
                },
            })
            const jsonData: OrderResponse = await response.json()
            return jsonData
        } catch (err) {
            return await Promise.reject(err)
        }
    }

    return fetchOrders
}
