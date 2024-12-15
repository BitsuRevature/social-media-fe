import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store.ts"
import { StyledEngineProvider } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.baseURL = 'http://localhost:8080/api/v1';
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <Provider store={store}>

                    <App />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={2000}

                    />

                </Provider>
            </StyledEngineProvider>
        </BrowserRouter>
    </StrictMode>,
)
