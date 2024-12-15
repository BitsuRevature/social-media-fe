import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonMUI from "@mui/material/Button"
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
import { ChangeEvent, useRef, useState } from 'react';
import { ref, uploadBytes, UploadResult } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from '../firebase';
import { getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { createPost } from '../features/post/postSlice';

export default function CreatePost() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [mediaURL, setMediaURL] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286");
    const [fileDetails, setFileDetails] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const [content, setContent] = useState('');

    function handleContentChange(event: ChangeEvent<HTMLInputElement>) {
        setContent(event.target.value)
    }

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function handelFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setMediaURL(file.name);
            // setMedia(file);
            setFileDetails(file);
        }
    }

    function handleFilePickerOpen() {
        fileInputRef.current?.click();
    }

    async function uploadFile() {
        const file = fileDetails;
        if (!file || uploading) return;

        setUploading(true);

        const imageRef = ref(storage, `images/${file.name + v4()}`);
        const res = await uploadBytes(imageRef, file);

        const downloadURL = await getDownloadURL(ref(storage, res.metadata.fullPath))
        setMediaURL(downloadURL);
        alert(downloadURL)
        return downloadURL;
    }

    function handleCancel() {
        navigate('/');
    }

    async function handleSave() {
        const mURL = await uploadFile();

        dispatch(createPost({
            content: content,
            mediaURL: mURL as string
        }))

        navigate('/')
    }

    function handleImage() {

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
                    <Stack
                        direction="column"
                        spacing={3}
                        sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                    >
                        <Stack direction="column" spacing={1}>
                            <AspectRatio
                                ratio="1"
                                minHeight={400}
                                maxHeight={500}
                                sx={{ flex: 1, minWidth: 120 }}
                            >
                                <img
                                    src={mediaURL}
                                    // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
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
                                    left: 30,
                                    top: 30,
                                    boxShadow: 'sm',
                                }}
                                onClick={handleFilePickerOpen}
                            >
                                <EditRoundedIcon />
                                <Input
                                    style={{
                                        display: "none"
                                    }}
                                    type='file'
                                    onChange={handleImage}
                                ></Input>
                            </IconButton>

                        </Stack>
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            <Stack spacing={1}>
                                <FormLabel>Content</FormLabel>
                                <FormControl
                                    sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                >
                                    <Input size="sm" placeholder="Describe your post ... " name='content' defaultValue={"" as string}
                                        onChange={handleContentChange}
                                        required
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
                        <Stack direction="column" spacing={2}>
                            <Stack direction="column" spacing={1}>
                                <AspectRatio
                                    ratio="1"
                                    minHeight={400}
                                    sx={{ flex: 1, minWidth: 108 }}
                                >
                                    <img
                                        src={mediaURL}
                                        // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
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
                                        // left: 85,
                                        // top: 180,
                                        boxShadow: 'sm',
                                    }}
                                    onClick={handleImage}

                                >
                                    <EditRoundedIcon />
                                </IconButton>
                            </Stack>
                            <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                <FormLabel>Content</FormLabel>
                                <FormControl
                                    sx={{
                                        display: {
                                            sm: 'flex-column',
                                            md: 'flex-row',
                                        },
                                        gap: 2,
                                    }}
                                >
                                    <Input size="sm" placeholder="Add more to your post" name='content' defaultValue={"" as string}
                                        onChange={handleContentChange}

                                    />
                                </FormControl>
                            </Stack>
                        </Stack>

                    </Stack>

                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button
                                size="sm" variant="outlined" color="neutral"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm" variant="solid"
                                onClick={handleSave}
                            >
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
                onChange={handelFileChange}
            />
        </Box>
    );
}