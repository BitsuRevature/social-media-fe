import { useParams } from "react-router-dom";
import { UserType } from "../util/types";
import Connection from "./Connection";
import { CardActions, CardOverflow } from "@mui/joy";
import FriendButton from "./FriendButtons";
import { useEffect, useState } from "react";
import { getFriendRequests, getFriends} from "../util/apiHelper";


export default function FriendsConnections() {
    const { id } = useParams();

    const [friends, setFriends]: [UserType[], any] = useState([]);

    const [friendRequests, setFriendRequest]: [UserType[], any] = useState([]);

    useEffect(() => {
        getFriends().then((data) => {
            setFriends(data);
        })

        getFriendRequests().then((data) => {
            setFriendRequest(data);
        })

    }, [])

    return (
        <div>
            <h2>Your Friends</h2>
            {friends.length > 0 ? (
                friends.map(friend => (
                    <Connection
                        key={friend.id}
                        connection={friend}
                    />
                ))
            ) : (
                <p>No friends yet.</p>
            )}

            <h2>Friend Requests</h2>
            {friendRequests.length > 0 ? (
                friendRequests.map(request => (
                    <Connection
                        key={request.id}
                        connection={request}
                    />
                ))
            ) : (
                <p>No pending friend requests.</p>
            )}

            {id && (
                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <FriendButton connection={friends.find(friend => friend.id === parseInt(id))!} />
                    </CardActions>
                </CardOverflow>
            )}
        </div>
    );
}