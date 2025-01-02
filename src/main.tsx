import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store.ts"
import { StyledEngineProvider } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.baseURL = 'http://ec2-3-137-181-232.us-east-2.compute.amazonaws.com/api/v1';

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
