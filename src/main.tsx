import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import ContextProviders from "./contexts/ContextProviders.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store.ts"
import { CssVarsProvider, StyledEngineProvider } from "@mui/material";


axios.defaults.baseURL = 'http://localhost:8080/api/v1';
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <StyledEngineProvider injectFirst>
                    <App />
                </StyledEngineProvider>
            </Provider>
            <ToastContainer position="bottom-right" />
        </BrowserRouter>
    </StrictMode>,
)
