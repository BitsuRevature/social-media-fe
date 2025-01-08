import { Button } from "@mui/joy"
import { follow, unFollow } from "../util/apiHelper"
import { UserType } from "../util/types"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

type FollowButtonProps = {
    connection: UserType
    following: UserType[]
    setFollowing: any
}

export default function FollowButton({ connection, following, setFollowing }: FollowButtonProps) {

    function checkIfFollowing(): boolean {
        return following.some((item) => item.id == connection.id)
    }

    async function handleUnfollow(e: React.MouseEvent) {
        e.stopPropagation();
        unFollow(connection.id)
            .then(() => {
                setFollowing(following.filter(item => item.id != connection.id))
            })
    }

    async function handleFollow(e: React.MouseEvent) {
        e.stopPropagation();
        follow(connection.id)
            .then(() => {
                setFollowing([...following, connection])
            })
    }

    return (
        <>
            {checkIfFollowing() ?
                <Button size="sm" variant="solid" color="danger"
                    style={{
                        position: "relative",
                        right: 0
                    }}
                    onClick={(e) => handleUnfollow(e)}
                >
                    <PersonRemoveIcon sx={{ marginRight: 1 }} /> Unfollow
                </Button> :
                <Button size="sm" variant="solid" color="primary"
                    style={{
                        position: "relative",
                        right: 0
                    }}
                    onClick={(e) => handleFollow(e)}
                >
                    <PersonAddIcon sx={{ marginRight: 1 }} /> Follow

                </Button>
            }
        </>
    )
}