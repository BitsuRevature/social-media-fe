import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useAppSelector } from '../app/hooks';
import { UserType } from '../util/types';
import { FunctionComponent, useEffect, useState } from 'react';
import { getAllConnections, getUserConnections } from '../util/apiHelper';
import Connection from './Connection';
import { FormControl,  Input } from '@mui/joy';

interface ConnectionsProps {

}

const Connections: FunctionComponent<ConnectionsProps> = () => {

  const authStore = useAppSelector(store => store.auth);

  const viewIdxStore = useAppSelector(store => store.viewIdx);
  const [connections, setConnections]: [UserType[], any] = useState([]);
  const [following, setFollowing]: [UserType[], any] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {

    getAllConnections(search)
      .then((data) => {
        setConnections(data.filter(c => c.id != authStore.auth?.id))
      })
    getUserConnections(search)
      .then((data) => {
        setFollowing(data)
      })


  }, [viewIdxStore, search])


  return (
    <Box>
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
          <Typography component="h1" sx={{ mt: 1, mb: 2 }}>
            {viewIdxStore.idx == 3 ? "All" : "Following"}
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
        <FormControl id="free-solo-demo" >
        {/* <FormLabel>freeSolo</FormLabel> */}
        <Input 
          placeholder='Search'
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </FormControl>

        {
          viewIdxStore.idx == 3 ?
            connections.map((connection: UserType) => {
              return <Connection key={connection.id} connection={connection} following={following} setFollowing={setFollowing} />
            }) :
            following.map((connection: UserType) => {
              return <Connection key={connection.id} connection={connection} following={following} setFollowing={setFollowing} />
            })
        }

        {/* {
          postStore.isLoading ?
            <></> :
            (
              postStore.posts.map((post: PostType) => {
                return <Post key={post.id} post={post} />;
              }
              )
            )
        } */}


      </Stack>
    </Box>
  );
}

export default Connections;