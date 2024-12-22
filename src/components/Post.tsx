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
import { addComment, deletePost, likePost, unLikePost } from '../features/post/postSlice';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import Avatar from '@mui/joy/Avatar';
import { CardContent, CardMedia, } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/joy/IconButton'
import { useState } from 'react';


import AddIcon from '@mui/icons-material/AddRounded'
import RemoveIcon from '@mui/icons-material/Remove';
import { FormControl, Input } from '@mui/joy';



export default function Post({ post }: { post: PostType }) {

    const authStore = useAppSelector(store => store.auth);
    const dispatch = useAppDispatch();

    const [commentInput, setCommentInput] = useState("");

    const [show, setShow] = useState(true);
    const [like, setLike] = useState(
        authStore.auth?.id! in post.reactions
    );

    const [open, setOpen] = useState(false);
    // const handleClose = () => setOpen(false);


    async function handleDelete() {
        dispatch(deletePost(post.id)).then(() => {
        })
        setShow(false);

    }

    async function handleLike() {
        if (like) {
            dispatch(unLikePost({ postId: post.id, userId: authStore.auth?.id as number }))
            setLike(false);
        } else {
            dispatch(likePost({ postId: post.id, userId: authStore.auth?.id as number }))
            setLike(true);
        }
    }

    async function handleAddComment() {
        dispatch(addComment({
            postId: post.id,
            content: commentInput
        }))
        setOpen(false);
    }

    return (
        show && <Card>

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

                    {/* <Button size="sm" variant="solid">
                        {

                        }
                        Save
                    </Button> */}
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
                    <IconButton
                        onClick={handleLike}
                    >
                        <FavoriteIcon sx={like ? { color: "red" } : {}} />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        {!open ? <AddIcon /> : <RemoveIcon/>}
                    </IconButton>


                </CardActions>

            </Stack>


            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                {open && <CardContent>

                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                        <Stack spacing={1}>
                            <FormControl
                                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                            >
                                <Input size="sm" placeholder="Add new comment" name='content' defaultValue={"" as string}
                                    onChange={(e) => {
                                        setCommentInput(e.target.value)
                                    }}
                                    required
                                />
                            </FormControl>
                            <Button
                                size="sm" variant="solid"
                                onClick={handleAddComment}
                            >
                                Add Comment
                            </Button>
                        </Stack>
                    </Stack>

                </CardContent>}
                <CardContent>
                    {
                        post.comments.map((comment: CommentType) => {
                            return (
                                <Comment key={comment.id} comment={comment} postId={post.id} />
                            )
                        })
                    }
                </CardContent>
                {/* <CardContent>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        style={style}
                    >
                        <Box >
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Modal>
                </CardContent> */}

            </CardOverflow>
        </Card>

    )

}