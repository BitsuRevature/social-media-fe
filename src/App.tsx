import {useEffect} from 'react'
import {useAuth, useAuthUpdate} from "./contexts/AuthContext.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthContextType} from "./util/types.ts";
import Home from "./pages/Home.tsx";
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { updateAuth } from './features/auth/authSlice.ts';

function App() {

    const authStore = useAppSelector(store => store.auth);
    const dispatch = useAppDispatch();

    // const auth = useAuth();
    // const authUpdate = useAuthUpdate();

    useEffect(() => {
        // if (localStorage.getItem('user')) {
        //     const data: AuthContextType = JSON.parse(localStorage.getItem('user')!);
        //     authUpdate!(
        //         data
        //     );
        // }

        if(localStorage.getItem('user')){
            const data: AuthContextType = JSON.parse(localStorage.getItem('user')!);
            dispatch(updateAuth(data))

        }

    }, [])

    return (
        <>
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
        </>
    )
}

export default App
