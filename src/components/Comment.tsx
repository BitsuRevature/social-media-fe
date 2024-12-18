import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { CommentType } from "../util/types";
import { formateDate } from "../util/helper";
import Button from "@mui/joy/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteComment } from "../features/post/postSlice";
import { useState } from "react";


export default function Comment({ postId, comment }: { postId: number, comment: CommentType }) {

    const authStore = useAppSelector(store => store.auth);
    const dispatch = useAppDispatch();

    const [show, setShow] = useState(true);
    
    
    function handleDelete() {
        dispatch(
            deleteComment({ postId, commentId: comment.id })
        );

        setShow(false);
    }

    return (
        show && <Stack
            direction="row"
            spacing={3}
            alignItems="center"
        >
            <AspectRatio
                ratio="1"
                maxHeight={40}
                sx={{ flex: 1, minWidth: 40, maxWidth: 40, borderRadius: '100%' }}
            >
                <img
                    // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                    // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                    src={comment.user.profilePicture}
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <Box sx={{ mb: 1 }}>
                <Stack
                    direction="row"
                    spacing={3}
                    alignContent="center"
                    justifyContent="space-between"
                >
                    <Stack
                        direction="row"
                        alignContent="center"
                        justifyContent="space-between"
                        width={"300px"}
                    >
                        <Typography level="title-md">{comment.user.username}</Typography>

                        <Typography level="body-sm">
                            {formateDate(comment.createdAt)}
                        </Typography>
                    </Stack>

                </Stack>
                <Typography level="body-sm">
                    {comment.content}
                </Typography>
            </Box>
            {
                authStore.auth?.id == comment.user.id ? (
                    <Button size="sm" variant="solid" color="danger"
                        style={{
                            position: "relative",
                            right: 0
                        }}
                        onClick={handleDelete}
                    >
                        Delete Comment
                    </Button>
                ) : ""
            }
        </Stack>
    )
}