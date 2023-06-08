import React from 'react'

export const SidebarBrand: React.FC = () => {
    return (
        <>
            <div className="brand-container flex items-center px-5">
                <img src="/logo.png" className="w-12 h-12 object-cover" alt="logo" />
                <span className="brand-text lobster ml-2.5">Admin.</span>
            </div>
        </>
    )
}
