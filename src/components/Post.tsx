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
import { CommentType, PostType } from '../util/types';
import Comment from './Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deletePost, getPosts } from '../features/post/postSlice';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import Avatar from '@mui/joy/Avatar';
import { CardContent, CardMedia } from '@mui/material';


export default function Post({ post }: { post: PostType }) {

    const authStore = useAppSelector(store => store.auth);
    const dispatch = useAppDispatch();

    async function handleDelete() {
        dispatch(deletePost(post.id))
        // dispatch(getPosts())
    }

    return (
        <Card>

            <CardHeader
                avatar={
                    <Avatar>
                        {post.user.profilePicture}
                    </Avatar>
                }
                sx={{
                    height: 25
                }}
                title={post.user.username}
                subheader={formateDate(post.createdAt)}
            />



            <Divider />

            <Stack
                direction="column"
                spacing={3}
                sx={{ display: { xs: 'flex', md: 'flex' }, my: 1 }}
                justifyContent="center"
            >
                <CardMedia
                    component="img"
                    height={500}
                    image={post.mediaURL}
                />
                <CardContent
                    sx={{
                        height: 25
                    }}
                >
                    <Typography>
                        {post.content}
                    </Typography>
                </CardContent>

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

            </Stack>


            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                    {
                        post.comments.map((comment: CommentType) => {
                            return (
                                <Comment key={comment.id} comment={comment} postId={post.id} />
                            )
                        })
                    }
                </CardContent>

            </CardOverflow>
        </Card>
    )

}