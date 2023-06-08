import { createBrowserRouter } from 'react-router-dom'
import { Home, Orders } from './pages'
import { AdminHome, AdminOrders, Auth, Brands, Products } from './pages/admin'
import { Dashboard } from './template'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/order-list',
        element: <Orders />,
    },
    {
        path: '/order-list/:phone',
        element: <Orders />,
    },
    {
        path: '/admin',
        element: <Dashboard />,
        children: [
            {
                path: '/admin',
                element: <AdminHome />,
            },
            {
                path: '/admin/orders',
                element: <AdminOrders />,
            },
            {
                path: '/admin/products',
                element: <Products />,
            },
            {
                path: '/admin/brands',
                element: <Brands />,
            },
        ],
    },
    {
        path: '/auth',
        element: <Auth />,
    },
])
