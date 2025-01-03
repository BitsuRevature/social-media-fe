import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { AuthContextType } from "./util/types.ts";
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import { useAppDispatch } from './app/hooks.ts';
import { updateAuth } from './features/auth/authSlice.ts';
import { Box, CircularProgress, CssBaseline, CssVarsProvider, GlobalStyles } from '@mui/joy';
import Posts from './pages/Posts.tsx';
import CreatePost from './components/CreatePost.tsx';
import Connections from './pages/Connections.tsx';
import MyProfile from './components/MyProfile.tsx';
import AllConnections from './components/AllConnections.tsx';
import FollowingConnections from './components/FollowingConnections.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';


function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const data: AuthContextType = JSON.parse(localStorage.getItem('user')!);
            dispatch(updateAuth(data))
        }
        setLoading(false);
    }, [])

    if (loading) return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bgcolor="rgba(255, 255, 255, 0.7)"
        >
            <CircularProgress size={"lg"} />
        </Box>
    );

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
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/posts" />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/posts/create" element={<CreatePost />} />
                        <Route element={<Connections />}>
                            <Route path="/users/all" element={<AllConnections />} />
                            <Route path="/users/following" element={<FollowingConnections />} />
                        </Route>
                        <Route path="/profile" element={<MyProfile />} />
                    </Route>
                </Routes>
            </Router>
        </CssVarsProvider>
    )
}

export default App
