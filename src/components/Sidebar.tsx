import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { closeSidebar } from '../util/utils';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import ColorSchemeToggle from './ColorSchemeToggle';




function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: 'grid',
            transition: '0.2s ease',
            '& > *': {
              overflow: 'hidden',
            },
          },
          open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}


export default function Sidebar() {

  const authStore = useAppSelector(store => store.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function handleLogOut(e: React.MouseEvent) {
    e.stopPropagation();
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login",);
  }

  function handleNavigation(route: string) {
    closeSidebar();
    navigate(route);
  }


  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton variant="soft" color="primary" size="sm">
            <BrightnessAutoRoundedIcon />
          </IconButton>
          <Typography level="title-lg">Social Media</Typography>
        </Box>
        <ColorSchemeToggle />
      </Box>
      <Divider />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              onClick={
                () => handleNavigation('/feed')
              }
            >
              <HomeIcon />

              <ListItemContent>
                <Typography level="title-sm">Feed</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={
                () => handleNavigation('/discover')
              }
            >
              <ExploreIcon />

              <ListItemContent>
                <Typography level="title-sm">Discover</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>


          <ListItem>
            <ListItemButton
              onClick={
                () => handleNavigation('/posts/create')
              }
            >
              <AddRoundedIcon />

              <ListItemContent>
                <Typography level="title-sm">Create Post</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              defaultExpanded
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Users</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={[
                      open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    onClick={
                      () => handleNavigation('/users/following')
                    }
                  >Following</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    onClick={
                      () => handleNavigation('/users/followers')
                    }
                  >Followers</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton

                    onClick={
                      () => handleNavigation('/users/search')
                    }
                  >
                    Search
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

        </List>
      </Box>
      <Divider />
      <Box
        sx={{ display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer' }}
        onClick={() => handleNavigation('/profile')}
      >
        <Avatar
          variant="outlined"
          size="sm"
          src={authStore.auth?.profilePicture as string}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm" data-testid="fn_ln">{`${authStore.auth?.firstname} ${authStore.auth?.lastname}`}</Typography>
          <Typography level="body-xs">{authStore.auth?.username}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" title="Logout" onClick={(e) => handleLogOut(e)} >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}

