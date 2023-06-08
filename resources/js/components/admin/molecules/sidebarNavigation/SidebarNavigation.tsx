import React from 'react'
import { Link } from 'react-router-dom'
import { useDropdownClick, useMatchRouteClass } from '../../../../hooks'
import { SubMenu } from './SubMenu'

interface Props {
    setUserProfile: React.Dispatch<React.SetStateAction<boolean>>
    setUserLogout: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarElement: React.FC<Props> = ({ setUserProfile, setUserLogout }) => {
    const isHome = useMatchRouteClass('/admin')
    const isOrders = useMatchRouteClass('/admin/orders')
    const isProduct = useMatchRouteClass('/admin/products')
    const isBrands = useMatchRouteClass('/admin/brands')

    return (
        <div className="px-2 mt-4">
            <ul className="sidebar-navigation">
                <li className="overflow-hidden">
                    <Link
                        to={'/admin'}
                        className={`outline-none sidebar-link ${isHome} rounded flex px-4 items-center hover:bg-gray-100 my-1 h-11 text-gray-500 hover:text-gray-600 font-medium`}
                    >
                        <div className="flex gap-2.5 items-center flex-1 roboto">
                            <span
                                className="icon"
                                style={{
                                    ['--off' as string]: "url('/app-icon/dashboard_icon.svg')",
                                    ['--on' as string]: "url('/app-icon/dashboard_icon_solid.svg')",
                                    ['--mask-size' as string]: '22px',
                                }}
                            ></span>
                            <span>Dashboard</span>
                        </div>
                    </Link>
                </li>
                <li className="overflow-hidden">
                    <Link
                        to={'/admin/orders'}
                        className={`outline-none sidebar-link ${isOrders} rounded flex px-4 items-center hover:bg-gray-100 my-1 h-11 text-gray-500 hover:text-gray-600 font-medium`}
                    >
                        <div className="flex gap-2.5 items-center flex-1 roboto">
                            <span
                                className="icon"
                                style={{ ['--off' as string]: "url('/app-icon/receipt.svg')", ['--on' as string]: "url('/app-icon/receipt-filled.svg')" }}
                            ></span>
                            <span>Orders List</span>
                        </div>
                    </Link>
                </li>
                <li className="overflow-hidden">
                    <Link
                        to={'/admin/products'}
                        className={`outline-none sidebar-link ${isProduct} rounded flex px-4 items-center hover:bg-gray-100 my-1 h-11 text-gray-500 hover:text-gray-600 font-medium`}
                    >
                        <div className="flex gap-2.5 items-center flex-1 roboto">
                            <span className="icon" style={{ ['--off' as string]: "url('/app-icon/payment.svg')", ['--on' as string]: "url('/app-icon/payment-solid.svg')" }}></span>
                            <span>Products</span>
                        </div>
                    </Link>
                </li>
                <li className="overflow-hidden">
                    <Link
                        to={'/admin/brands'}
                        className={`outline-none sidebar-link ${isBrands} rounded flex px-4 items-center hover:bg-gray-100 my-1 h-11 text-gray-500 hover:text-gray-600 font-medium`}
                    >
                        <div className="flex gap-2.5 items-center flex-1 roboto">
                            <span
                                className="icon"
                                style={{ ['--off' as string]: "url('/app-icon/task-featured.svg')", ['--on' as string]: "url('/app-icon/task-featured.svg')" }}
                            ></span>
                            <span>Vendors / Brands</span>
                        </div>
                    </Link>
                </li>
                <li className="overflow-hidden sidebar-list">
                    <a
                        onClick={useDropdownClick()}
                        className={`cursor-pointer outline-none sidebar-link rounded flex px-4 items-center hover:bg-gray-100 my-1 h-11 text-gray-500 hover:text-gray-600 font-medium`}
                    >
                        <div className="flex gap-2.5 items-center flex-1 roboto">
                            <span className="icon" style={{ ['--off' as string]: "url('/app-icon/settings.svg')" }}></span>
                            <span>Settings</span>
                        </div>
                        <span
                            style={{ ['--icon' as string]: "url('/app-icon/chevron-right.svg') no-repeat center" }}
                            className="arrow-icon inline-flex items-center justify-center"
                        ></span>
                    </a>
                    <SubMenu setUserProfile={setUserProfile} setUserLogout={setUserLogout} />
                </li>
            </ul>
        </div>
    )
}

export const SidebarNavigation = React.memo(SidebarElement)
