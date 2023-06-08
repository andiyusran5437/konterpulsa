import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const OrderListBtn: React.FC = () => {
    const navigate = useNavigate()
    const handleClick = useCallback(() => {
        navigate('/order-list')
    }, [])

    return (
        <div onClick={handleClick} className="flex items-center gap-1.5 roboto hover:bg-slate-50 text-slate-500 hover:text-slate-600 cursor-pointer border px-4 py-2 rounded">
            <span>Oder listing</span>
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.7274 5.43582L19.2916 11L13.7274 16.5642M3.70825 11H19.1358"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}
