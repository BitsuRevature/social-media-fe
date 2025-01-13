import { Button } from "@mui/joy"
import { checkIfFollowing, follow, unFollow } from "../util/apiHelper"
import { UserType } from "../util/types"
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { useEffect, useState } from "react";

type FollowButtonProps = {
    connection: UserType
    // following: UserType[]
    // setFollowing: any
}

export default function FollowButton({ connection }: FollowButtonProps) {

    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        checkIfFollowing(connection.id).then(
            (data) => {
                console.log(data)
                setIsFollowing(data);
            }
        )
    }, [])


    async function handleUnfollow(e: React.MouseEvent) {
        e.stopPropagation();
        unFollow(connection.id)
            .then(() => {
                // setFollowing(following.filter(item => item.id != connection.id))
                setIsFollowing(false);
            })
    }

    async function handleFollow(e: React.MouseEvent) {
        e.stopPropagation();
        follow(connection.id)
            .then(() => {
                // setFollowing([...following, connection])
                setIsFollowing(true);
            })
    }

    return (
        <>
            {/* {isFollowing} */}
            {isFollowing ?
                <Button size="sm" variant="solid" color="danger"
                    style={{
                        position: "relative",
                        right: 0
                    }}
                    onClick={(e) => handleUnfollow(e)}
                >
                    <RemoveCircleOutlineRoundedIcon sx={{ marginRight: 1 }} /> Unfollow
                </Button> :
                <Button size="sm" variant="solid" color="primary"
                    style={{
                        position: "relative",
                        right: 0
                    }}
                    onClick={(e) => handleFollow(e)}
                >
                    <AddCircleOutlineRoundedIcon sx={{ marginRight: 1 }} /> Follow

                </Button>
            }
        </>
    )
}