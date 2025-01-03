import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';

// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { FunctionComponent, useState } from 'react';
import { FormControl, Input } from '@mui/joy';
import { Outlet, useLocation } from 'react-router-dom';

interface ConnectionsProps {

}

const Connections: FunctionComponent<ConnectionsProps> = () => {

  const [search, setSearch] = useState('');
  const location = useLocation();

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
          {/* <Breadcrumbs
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
          </Breadcrumbs> */}
          <Typography component="h1" sx={{ mt: 1, mb: 2 }}>
            {
              (() => {
                const endpoint = location.pathname.split('/').pop();
                return endpoint ? endpoint.charAt(0).toUpperCase() + endpoint.slice(1) : endpoint;
              })()
            }
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
          <Input
            placeholder='Search'
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </FormControl>

        <Outlet context={{ search }} />

      </Stack>
    </Box>
  );
}

export default Connections;