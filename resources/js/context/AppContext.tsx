import React, { useMemo, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { type Order, type Brand, type Product } from '../types'

export const AppContext = React.createContext({})
export interface AppContextType {
    brand?: Brand
    setBrand: React.Dispatch<React.SetStateAction<Brand | undefined>>
    phone: string
    setPhone: React.Dispatch<React.SetStateAction<string>>
    products: Product[]
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
    product?: Product
    setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>
    orders: Order[]
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>
    orderExp: number
    trackingNumber: string
    setTrackingNumber: React.Dispatch<React.SetStateAction<string>>
    reloadCount: number
    setReloadCountCount: React.Dispatch<React.SetStateAction<number>>
    sidebarShown: boolean
    setSidebarShown: React.Dispatch<React.SetStateAction<boolean>>
}

interface Props {
    children?: React.ReactNode
}

export const AppProvider: React.FC<Props> = ({ children }) => {
    const [brand, setBrand] = useState<Brand>()
    const [phone, setPhone] = useState<string>('')
    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product>()
    const [orders, setOrders] = useState<Order[]>([])
    const [orderExp] = useState(3600) // in seconds
    const [trackingNumber, setTrackingNumber] = useState<string>('')
    const [reloadCount, setReloadCountCount] = useState(0)
    const [sidebarShown, setSidebarShown] = useState(true)

    const data = useMemo<AppContextType>(() => {
        return {
            sidebarShown,
            setSidebarShown,
            reloadCount,
            setReloadCountCount,
            trackingNumber,
            setTrackingNumber,
            orderExp,
            orders,
            setOrders,
            brand,
            setBrand,
            phone,
            setPhone,
            products,
            setProducts,
            product,
            setProduct,
        }
    }, [brand, products, phone, product, orders, reloadCount, trackingNumber, sidebarShown])

    return (
        <AppContext.Provider value={data}>
            {children} <Toaster />
        </AppContext.Provider>
    )
}
