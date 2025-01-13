import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

import { useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import { getUserDetails, getUserFollowing, getFriendRequests, unfriend } from '../util/apiHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { UserProfileType, UserType } from '../util/types';
import FollowButton from '../components/FollowButton';
import Posts from './Posts';
import { Avatar, IconButton } from '@mui/joy';
import FriendButton from '../components/FriendButtons';

export default function Profile() {

  const { username } = useParams();

  const authStore = useAppSelector(store => store.auth);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState<UserProfileType>();

  useEffect(() => {
    if (username === authStore.auth?.username) {
      navigate('/profile');
    } else {
      getUserDetails(username ? username : authStore.auth?.username!).then(u => {
        setUserProfile(u);
      })
    }
  }, [authStore, navigate]);

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
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            {(username ? "User" : "My") + " Profile"}
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
        <Card>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography level="title-md">Personal info</Typography>
            {!username &&
              <IconButton onClick={() => navigate('/profile/edit')}>
                <EditIcon />
              </IconButton>
            }
          </Stack>

          <Divider />

          <Stack
            direction="row"
            spacing={3}
            sx={{ my: 1 }}
          >
            <Avatar
              src={userProfile?.profilePicture}
              alt={`${userProfile?.username}'s profile picture`}
              sx={{ width: 200, height: 200 }}
            />
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                {(userProfile?.firstname || userProfile?.lastname) && <Typography>{userProfile?.firstname as string + " " + userProfile?.lastname as string}</Typography>}
              </Stack>
              <Stack spacing={1}>
                <FormLabel>User Name</FormLabel>
                <Stack direction="row" alignItems="center" spacing={.5}>
                  <PersonIcon />
                  <Typography>{userProfile?.username as string}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {userProfile?.bio &&
            <>
              <Divider />

              <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Bio</Typography>
              </Box>
              <Stack spacing={2} sx={{ my: 1 }}>
                <Typography
                  level="body-sm"
                  sx={{ mt: 1.5 }}>
                  {userProfile.bio as string}
                </Typography>
              </Stack>
            </>
          }

          {userProfile && userProfile.username !== authStore.auth?.username &&
            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
              <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                <FollowButton connection={userProfile as UserType} />
                <FriendButton
                    connection={userProfile as UserType}
                />
              </CardActions>
            </CardOverflow>
          }
        </Card>

        <Posts posts={userProfile?.posts!} heading="Posts" />

      </Stack>
    </Box>
  );
}
