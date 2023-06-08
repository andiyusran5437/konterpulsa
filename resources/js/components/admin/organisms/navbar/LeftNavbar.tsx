import React from 'react'
import { Link } from 'react-router-dom'

export const LeftNavbar: React.FC = () => {
    return (
        <ul className="navigation flex">
            <li>
                <Link to={'/admin'} className="navigation-link px-4 roboto text-gray-500 hover:text-gray-400 font-medium">
                    Home
                </Link>
            </li>
        </ul>
    )
}
