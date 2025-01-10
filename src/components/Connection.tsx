import { FunctionComponent } from "react";
import { UserType } from "../util/types";
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Avatar, CardContent } from "@mui/joy";
import { CardActions } from "@mui/joy";

import FollowButton from "./FollowButton";
import LinkToProfile from "./LinkToProfile";

interface ConnectionProps {
    connection: UserType
    following: UserType[]
    setFollowing: any
}

const Connection: FunctionComponent<ConnectionProps> = ({ connection, following, setFollowing }: ConnectionProps) => {

    return (
        <LinkToProfile username={connection.username}>
            <Card>
                <Stack
                    direction={"row"}
                    spacing={3}
                    sx={{ display: { xs: 'flex', md: 'flex' }}}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            my: 1,
                            flexDirection: "row",
                            alignItems: "center"
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
                    <CardActions>
                        <FollowButton connection={connection} following={following} setFollowing={setFollowing} />
                    </CardActions>
                </Stack>
            </Card>
        </LinkToProfile>
    );
}

export default Connection;