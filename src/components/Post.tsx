import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import { formateDate } from '../util/helper'
import { useAuth } from '../contexts/AuthContext';
import { CommentType, PostType } from '../util/types';
import Comment from './Comment';
import { useAppDispatch, useAppSelector} from '../app/hooks';
import { deletePost, getPosts } from '../features/post/postSlice';


export default function Post({ post }: { post: PostType }) {

    const authStore = useAppSelector(store => store.auth); 
    const dispatch = useAppDispatch();


    async function handleDelete() {
        dispatch(deletePost(post.id))
        dispatch(getPosts())
    }

    return (
        <Card>
            <Stack
                direction="row"
                spacing={3}
                alignItems="center"
            >
                <AspectRatio
                    ratio="1"
                    maxHeight={60}
                    sx={{ flex: 1, minWidth: 40, maxWidth: 60, borderRadius: '100%' }}
                >
                    <img
                        // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                        // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                        src={post.user.profilePicture}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">{post.user.username}</Typography>
                    <Typography level="body-sm">
                        {formateDate(post.createdAt)}
                    </Typography>
                </Box>
            </Stack>


            <Divider />

            <Stack
                direction="column"
                spacing={3}
                sx={{ display: { xs: 'flex', md: 'flex' }, my: 1 }}
                justifyContent="center"
            >
                <AspectRatio
                    ratio="1"
                    maxHeight={500}
                    sx={{ flex: 1, minWidth: 40, maxWidth: "95%" }}
                >
                    <img
                        // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                        src={post.user.profilePicture}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>

                {
                    post.comments.map((comment: CommentType) => {
                        return (
                            <Comment key={comment.id} comment={comment} postId={post.id} />
                        )
                    })
                }

            </Stack>

            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>

                    <Button size="sm" variant="solid">
                        {

                        }
                        Save
                    </Button>
                    {
                        authStore.auth?.id == post.user.id ? (
                            <Button
                                size="sm" variant="solid" color="danger"
                                onClick={handleDelete}
                            >
                                Delete Post
                            </Button>
                        ) : ""
                    }
                </CardActions>
            </CardOverflow>
        </Card>
    )

}