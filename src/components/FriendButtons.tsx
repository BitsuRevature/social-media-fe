import { UserType } from "../util/types";
import Button from '@mui/joy/Button';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import { getFriendRequests, checkIsFriend, sendFriendRequest, unfriend, checkIsFriendRequest, acceptFriendRequest, declineFriendRequest } from "../util/apiHelper"

type FriendButtonProps = {
    connection: UserType;
    friendRequests?: any[];
    setFriendRequests?: React.Dispatch<React.SetStateAction<any[]>>;
    onUnfriend?: (connectionId: number) => Promise<void>;
};

export default function FriendButton({ connection }: FriendButtonProps) {
    const [isFriend, setIsFriend] = useState(false);
    const [hasFriendRequest, setFriendRequest] = useState(false);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        checkIsFriend(connection.id).then((data) => {
            setIsFriend(data);
        })

        checkIsFriendRequest(connection.id, "PENDING").then((data) => {
            setFriendRequest(data);
        })

    }, [])

    function handleFriend(e: React.MouseEvent) {
        e.stopPropagation();
        sendFriendRequest(connection.id).then(() => {
            setIsFriend(true);
        })
    }
    function handleUnFriend(e: React.MouseEvent) {
        e.stopPropagation();
        unfriend(connection.id).then(() => {
            setIsFriend(false);
        })
    }
    function handleAcceptFriendRequest(e: React.MouseEvent){
        e.stopPropagation();
        acceptFriendRequest(connection.id).then(()=>{
            setFriendRequest(false);
            setIsFriend(true);
        })
    }
    function handleDeclineFriendRequest(e: React.MouseEvent){
        e.stopPropagation();
        declineFriendRequest(connection.id).then(()=>{
            setFriendRequest(false);
            setIsFriend(false);
        })
    }


    return (
        <>
            {isFriend ?
                <Button size="sm" variant="solid" color="danger"
                    style={{
                        position: "relative",
                        right: 0
                    }}
                    onClick={(e) => handleUnFriend(e)}
                >
                    <PersonRemoveIcon sx={{ marginRight: 1 }} /> Unfriend
                </Button> :

                hasFriendRequest ?
                    <>
                        <Button size="sm" variant="solid" color="primary"
                            style={{
                                position: "relative",
                                right: 0
                            }}
                            onClick={(e) => handleAcceptFriendRequest(e)}
                        >
                            <PersonAddIcon sx={{ marginRight: 1 }} /> Accept
                        </Button>
                        <Button size="sm" variant="solid" color="danger"
                            style={{
                                position: "relative",
                                right: 0
                            }}
                            onClick={(e) => handleDeclineFriendRequest(e)}
                        >
                            <PersonRemoveIcon sx={{ marginRight: 1 }} /> Decline
                        </Button>
                    </>
                    :

                    <Button size="sm" variant="solid" color="primary"
                        style={{
                            position: "relative",
                            right: 0
                        }}
                        onClick={(e) => handleFriend(e)}
                    >
                        <PersonAddIcon sx={{ marginRight: 1 }} /> Add Friend

                    </Button>



            }


        </>
    )
}