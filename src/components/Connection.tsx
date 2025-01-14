import { FunctionComponent } from "react";
import { UserType } from "../util/types";
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Avatar, CardContent, Divider } from "@mui/joy";
import { CardActions } from "@mui/joy";

import FollowButton from "./FollowButton";
import LinkToProfile from "./LinkToProfile";
import FriendButton from "./FriendButtons";


interface ConnectionProps {
    connection: UserType
}

const Connection: FunctionComponent<ConnectionProps> = ({ connection }: ConnectionProps) => {

    return (
        <LinkToProfile username={connection.username}>
            <Card>
                <Stack
                    spacing={3}
                    sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            my: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            flex: '1 1 auto',
                        }}
                    >
                        <Avatar
                            src={connection.profilePicture as string}
                            alt={`${connection.username}'s profile picture`}
                        />
                        <div>
                            <Typography level="h4">{connection.username}</Typography>
                            <Typography level="title-sm">{connection.bio}</Typography>
                        </div>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: 'flex',
                            flex: '2 0 auto',
                            justifyContent: 'flex-end',
                            '& > button': {
                                sm: {
                                    minWidth: 'fit-content',
                                    flex: '0 1 9em',
                                },
                            },
                        }}
                    >
                        <FriendButton connection={connection} />
                        <Divider orientation="vertical" />
                        <FollowButton connection={connection} />
                    </CardActions>
                </Stack>
            </Card>
        </LinkToProfile >
    );
}

export default Connection;