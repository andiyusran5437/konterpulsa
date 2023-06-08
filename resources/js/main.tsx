import './bootstrap'

import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import '../css/app.scss'
import { AppProvider } from './context/AppContext'
import { router } from './routes'
import { GlobalProvicer } from './context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <GlobalProvicer>
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    </GlobalProvicer>
)
