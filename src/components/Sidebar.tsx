import * as React from 'react';
import {
  GlobalStyles,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  listItemButtonClasses,
  ListItemContent,
  Typography,
  Sheet
} from '@mui/joy';
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  LogoutRounded as LogoutRoundedIcon,
  GroupRounded as GroupRoundedIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  PostAdd as PostAddIcon
} from '@mui/icons-material';

import { closeSidebar } from '../util/utils';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import ColorSchemeToggle from './ColorSchemeToggle';
import BalayHubLogo from './BalayHubLogo';
import { fetchFriendRequests } from '../features/user/userSlice';


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
  const userStore = useAppSelector(store => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [friendRequestCount, setFriendRequestCount] = React.useState(userStore.friendRequests.length);

  React.useEffect(() => {
    dispatch(fetchFriendRequests()).then(() => {
      setFriendRequestCount(userStore.friendRequests.length);
    })
  }, [])

  React.useEffect(() => {
    setFriendRequestCount(userStore.friendRequests.length);
  }, [userStore.friendRequests])


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
        <BalayHubLogo />
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
              <PostAddIcon />

              <ListItemContent>
                <Typography level="title-sm">Create Post</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
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
                      () => handleNavigation('/users/friends')
                    }
                  >
                    <Badge
                      badgeContent={friendRequestCount}
                      color="danger"
                      size="sm"
                      sx={{
                        '& .MuiBadge-badge': {
                          left: '-1em',
                          right: 'auto',
                          top: '50%',
                          transform: 'translate(-100%, -50%)',
                        },
                      }}
                      invisible={!friendRequestCount}
                    >
                      Friends
                    </Badge>
                  </ListItemButton>
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
          alt={"Your profile picture"}
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

