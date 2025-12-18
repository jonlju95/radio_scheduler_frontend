import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/index.css'
import {router} from "./router.tsx";
import {RouterProvider} from "react-router-dom";
import {ThemeProvider} from "./shared/contexts/ThemeContext.tsx";
import {AuthProvider} from "./shared/contexts/AuthContext.tsx";

createRoot(document.getElementById('root')! as HTMLElement).render(
    <StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>,
)
