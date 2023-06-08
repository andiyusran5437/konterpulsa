import React, { useContext, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Sidebar } from '../components/admin'
import { AdminProvider } from '../context'
import { AppContext, type AppContextType } from '../context/AppContext'

export const Dashboard: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    const context = useContext(AppContext) as AppContextType
    useEffect(() => {
        const container = containerRef.current
        const shown = context.sidebarShown
        if (container != null) {
            if (shown) container.classList.add('sidebar-shown')
            if (!shown) container.classList.remove('sidebar-shown')
        }
    }, [context.sidebarShown])

    return (
        <AdminProvider>
            <div ref={containerRef} className="dashboard-container sidebar-shown">
                <Navbar />
                <Sidebar />
                <div className="content py-4">
                    <Outlet />
                </div>
            </div>
        </AdminProvider>
    )
}
