// import {useAuth} from "../contexts/AuthContext.tsx";
// import {useNavigate} from "react-router-dom";
// import {useEffect, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {getPosts} from "../features/post/postSlice.ts";
// import {PostType} from "../util/types.ts";
// import Post from "../components/Post.tsx";

// import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MyProfile from '../components/MyProfile';

export default function Home() {

    // const auth = useAuth();
    // const navigate = useNavigate();

    // const postStore = useSelector((state) => state.post);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, []);


    return (
        <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
          <Sidebar />
          <Header />
          <Box
            component="main"
            className="MainContent"
            sx={{
              pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
              pb: { xs: 2, sm: 2, md: 3 },
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              height: '100dvh',
              gap: 1,
              overflow: 'auto',
            }}
          >
            <MyProfile />
          </Box>
        </Box>
      </CssVarsProvider>
    )
}