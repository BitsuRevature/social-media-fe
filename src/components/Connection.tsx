import { FunctionComponent } from "react";
import { UserType } from "../util/types";
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import { CardContent } from "@mui/joy";
import { CardActions } from "@mui/joy";

import FollowButton from "./FollowButton";

interface ConnectionProps {
    connection: UserType
    following: UserType[]
    setFollowing: any
}

const Connection: FunctionComponent<ConnectionProps> = ({ connection, following, setFollowing }: ConnectionProps) => {

    return (
        <Card>
            <Stack
                direction={"row"}
                spacing={3}
                sx={{ display: { xs: 'flex', md: 'flex' }, my: 1 }}
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
                    <AspectRatio
                        ratio="1"
                        maxHeight={40}
                        sx={{ flex: 1, minWidth: 40, maxWidth: 40, borderRadius: '100%' }}
                    >
                        <img
                            src={connection.profilePicture}
                            alt={connection.username}
                        />
                    </AspectRatio>
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
    );
}

export default Connection;