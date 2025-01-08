import {
    Box,
    CircularProgress,
    CssBaseline,
    CssVarsProvider,
    GlobalStyles,
} from "@mui/joy";
import { useEffect, useState } from "react";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import { useAppDispatch } from "./app/hooks.ts";
import CreatePost from "./components/CreatePost.tsx";
import FollowingConnections from "./components/FollowingConnections.tsx";
import MyProfile from "./components/MyProfile.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { logout, updateAuth } from "./features/auth/authSlice.ts";
import Connections from "./pages/Connections.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import { AuthContextType } from "./util/types.ts";
import FollowersConnections from './components/FollowersConnections.tsx';
import Discover from './pages/Discover.tsx';
import Feed from './pages/Feed.tsx';
import SearchConnections from "./components/SearchConnections.tsx";

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const data: AuthContextType = JSON.parse(localStorage.getItem('user')!);

            if (data.exipreDate == undefined || Date.now() > (data.exipreDate * 1000)) {
                dispatch(logout());
            } else {
                dispatch(updateAuth(data))
            }
        }
        setLoading(false);
    }, [])

    if (loading)
        return (
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
                    <Route path="/" element={<Navigate to="/feed" />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/posts/create" element={<CreatePost />} />
                        <Route element={<Connections />}>
                            <Route path="/users/following" element={<FollowingConnections />} />
                            <Route path="/users/followers" element={<FollowersConnections />} />
                            <Route path="/users/search" element={<SearchConnections />} />
                        </Route>
                        <Route path="/profile" element={<MyProfile />} />
                    </Route>
                </Routes>
            </Router>
        </CssVarsProvider>
    )
}

export default App;
