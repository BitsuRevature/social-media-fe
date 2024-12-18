// import Box from '@mui/joy/Box';
// import Stack from '@mui/joy/Stack';
// import Typography from '@mui/joy/Typography';
// import Breadcrumbs from '@mui/joy/Breadcrumbs';
// import Link from '@mui/joy/Link';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Post from '../components/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PostType } from '../util/types';
import { useEffect, useState } from 'react';
import { getPosts } from '../features/post/postSlice';
import { FormControl, IconButton, Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search'

export default function Posts() {

    const postStore = useAppSelector((store) => store.post);
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);

    const dispatch = useAppDispatch();

    // const [posts, setPosts] = useState(postStore.posts);

    useEffect(() => {
        dispatch(getPosts(search));
    }, [clicked]);




    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    zIndex: 9995,
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon />}
                        sx={{ pl: 0 }}
                    >
                        <Link
                            underline="none"
                            color="neutral"
                            href="/"
                            aria-label="Home"
                        >
                            <HomeRoundedIcon />
                        </Link>
                    </Breadcrumbs>
                    <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                        For You
                    </Typography>
                </Box>
            </Box>
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <FormControl id="free-solo-demo"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* <FormLabel>freeSolo</FormLabel> */}
                    <Input
                        placeholder='Search'
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        sx={{
                            width: "100%"
                        }}
                    />
                    <IconButton
                        onClick={() => setClicked(!clicked)}
                    >
                        <SearchIcon />
                    </IconButton>
                </FormControl>
                {
                    postStore.isLoading ?
                        <></> :
                        (
                            postStore.posts.map((post: PostType) => {
                                return <Post key={post.id} post={post} />;
                            }
                            )
                        )
                }


            </Stack>

        </Box>
    )
}