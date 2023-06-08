import { SidebarBrand } from '../../atoms'
import { SidebarNavigation } from '../../molecules'
import { useSidebarClose } from '../../../../hooks'
import { useContext, useState } from 'react'
import { AppContext, type AppContextType } from '../../../../context/AppContext'
import { UserProfile } from '../userProfile'
import { LogoutModal } from '../logoutModal'

export const Sidebar: React.FC = () => {
    const [userProfile, setUserProfile] = useState(false)
    const [userLogout, setUserLogout] = useState(false)

    const context = useContext(AppContext) as AppContextType
    const closeSidebar = useSidebarClose()

    return (
        <>
            <aside className="sidebar bg-white">
                <SidebarBrand />
                <SidebarNavigation setUserLogout={setUserLogout} setUserProfile={setUserProfile} />
            </aside>
            {context.sidebarShown ? <div onClick={closeSidebar} className="sidebar-overlay absolute top-0 right-0 bottom-0 left-0"></div> : null}

            {userProfile ? <UserProfile setState={setUserProfile} /> : null}
            {userLogout ? <LogoutModal setState={setUserLogout} /> : null}
        </>
    )
}
