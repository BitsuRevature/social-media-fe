import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { CommentType } from "../util/types";
import { formatDate } from "../util/helper";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteComment } from "../features/post/postSlice";
import { useState } from "react";
import { IconButton } from "@mui/joy";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinkToProfile from "./LinkToProfile";


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
            paddingBlock={1}
            alignItems="center"
        >
            <LinkToProfile username={comment.user.username}>
                <AspectRatio
                    ratio="1"
                    maxHeight={40}
                    sx={{ flex: 1, minWidth: 40, maxWidth: 40, borderRadius: '100%' }}
                >
                    <img
                        src={comment.user.profilePicture}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
            </LinkToProfile>
            <Box sx={{ mb: 1, flexGrow: 1 }}>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="baseline"
                    width={"300px"}
                >
                    <LinkToProfile username={comment.user.username}>
                        <Typography level="title-md">
                            {comment.user.username}
                        </Typography>
                    </LinkToProfile>

                    <Typography level="body-sm">
                        {formatDate(comment.createdAt)}
                    </Typography>

                </Stack>
                <Typography level="body-sm">
                    {comment.content}
                </Typography>
            </Box>
            {
                authStore.auth?.id == comment.user.id ? (
                    <IconButton color="danger"
                        style={{
                            position: "relative",
                            right: 0
                        }}
                        onClick={handleDelete}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                ) : ""
            }
        </Stack>
    )
}