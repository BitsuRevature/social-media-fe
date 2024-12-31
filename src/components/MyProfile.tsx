import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PersonIcon from '@mui/icons-material/Person';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ChangeEvent, useRef, useState } from 'react';
import { changeBio, changePIInfo, changeProfilePic } from '../util/apiHelper';
import { updateBio, updatePI, updateProfilePic } from '../features/auth/authSlice';
import { uploadFile } from '../util/helper';

export default function MyProfile() {

  const authStore = useAppSelector(store => store.auth);
  const dispatch = useAppDispatch()

  const [firstname, setFirstname] = useState(authStore.auth?.firstname);
  const [lastname, setLastname] = useState(authStore.auth?.lastname);
  const [bio, setBio] = useState(authStore.auth?.bio);

  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    uploadFile(file!, uploading, setUploading)
    .then(async (url) => {
      await changeProfilePic(url as string);
      dispatch(updateProfilePic(url))
    })
  }

  function handleFilePickerOpen() {
    fileInputRef.current?.click();
  }

  async function handlePISave() {

    const data = {
      firstname: firstname as string,
      lastname: lastname as string
    }

    changePIInfo(data).then(() => {
      dispatch(updatePI(data))
    })
  }

  async function handleBioSave() {
    const data = {
      bio: bio as string
    };
    changeBio(data).then(() => {
      dispatch(updateBio(data))
    })
  }

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
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Users
            </Link>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              My profile
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            My profile
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
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile will appear to others.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
              >
                <img
                  src={authStore.auth?.profilePicture as string}
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: 'background.body',
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  left: 100,
                  top: 170,
                  boxShadow: 'sm',
                }}
                onClick={handleFilePickerOpen}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                >
                  <Input size="sm" placeholder="First name" defaultValue={authStore.auth?.firstname as string}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setFirstname(event?.target.value)
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                >
                  <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} defaultValue={authStore.auth?.lastname as string}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setLastname(event?.target.value)
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>User Name</FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    startDecorator={<PersonIcon />}
                    defaultValue={authStore.auth?.username as string}
                    disabled
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={108}
                  sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}
                >
                  <img
                    src={authStore.auth?.profilePicture as string}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: 'background.body',
                    position: 'absolute',
                    zIndex: 2,
                    borderRadius: '50%',
                    left: 85,
                    top: 180,
                    boxShadow: 'sm',
                  }}
                  onClick={handleFilePickerOpen}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: 'flex-column',
                      md: 'flex-row',
                    },
                    gap: 2,
                  }}
                >
                  <Input
                    size="sm" placeholder="First name" defaultValue={authStore.auth?.firstname as string}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setFirstname(event?.target.value)
                    }}
                  />
                </FormControl>

                <FormControl
                  sx={{
                    display: {
                      sm: 'flex-column',
                      md: 'flex-row',
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="Last name" defaultValue={authStore.auth?.lastname as string}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setLastname(event?.target.value)
                    }}
                  />
                </FormControl>
              </Stack>
            </Stack>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>User Name</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<PersonIcon />}
                placeholder="email"
                defaultValue="siriwatk@test.com"
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid"
                onClick={handlePISave}
              >
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Bio</Typography>
            <Typography level="body-sm">
              Write a short introduction to be displayed on your profile
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <Textarea
              size="sm"
              minRows={4}
              sx={{ mt: 1.5 }}
              defaultValue={authStore.auth?.bio as string}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                setBio(event?.target.value)
              }} />
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleBioSave}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }} // Hides the file input
        onChange={handleFileChange}
      />
    </Box>
  );
}
