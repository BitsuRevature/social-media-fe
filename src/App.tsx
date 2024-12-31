import {useEffect} from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthContextType} from "./util/types.ts";
import Home from "./pages/Home.tsx";
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { updateAuth } from './features/auth/authSlice.ts';
import { CssBaseline, CssVarsProvider, GlobalStyles } from '@mui/joy';


function App() {

    const authStore = useAppSelector(store => store.auth);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if(localStorage.getItem('user')){
            const data: AuthContextType = JSON.parse(localStorage.getItem('user')!);
            dispatch(updateAuth(data))

        }

    }, [])

    return (
        <CssVarsProvider>
            <CssBaseline />
            <GlobalStyles
                styles={{
                ':root': {
                    '--Form-maxWidth': '800px',
                    '--Transition-duration': '0.4s', // set to `none` to disable transition
                },
                }}
            />
            {
                authStore.auth ? (
                    <Home/>
                ) : (
                    <Routes>
                        <Route path="/login" element={<SignIn />}/>
                        <Route path="/register" element={<SignUp/>}/>
                        <Route path="/" element={<Navigate to="/login"/>}/>
                    </Routes>
                )

            }
        </CssVarsProvider>
    )
}

export default App
