import {useEffect} from 'react'
import {useAuth, useAuthUpdate} from "./contexts/AuthContext.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import {AuthContextType} from "./util/types.ts";
import Home from "./pages/Home.tsx";
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';

function App() {
    const auth = useAuth();
    const authUpdate = useAuthUpdate();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const data: AuthContextType = JSON.parse(localStorage.getItem('user')!);
            authUpdate!(
                data
            );
        }
    }, [])

    return (
        <>
            {
                auth ? (
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
