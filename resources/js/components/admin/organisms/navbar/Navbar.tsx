import React from 'react'
import { LeftNavbar } from './LeftNavbar'
import { RightNavbar } from './RightNavbar'
import { Toggler } from '../../atoms'

export const Navbar: React.FC = () => {
    return (
        <header className="flex header bg-white items-center justify-between">
            <Toggler />

            <nav className="flex-1 flex items-center justify-between">
                <LeftNavbar />
                <RightNavbar />
            </nav>
        </header>
    )
}
