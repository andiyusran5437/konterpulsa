import React from 'react'

export const RightNavbar: React.FC = () => {
    return (
        <ul className="navigation flex">
            <li className="flex relative">
                <a className="cursor-default navigation-link avatar-item flex gap-2 items-center px-4 roboto text-gray-500 font-medium" href="#">
                    <span>Jhonson</span>
                    <img src="/avatars/avatar-2.png" className="object-cover w-9 h-9 object-top rounded-full" alt="avatar" />
                </a>
            </li>
        </ul>
    )
}
