import { useEffect, useState } from "react"
import { getUserFollowers, getUserFollowing } from "../util/apiHelper"
import { UserType } from '../util/types';
import Connection from "./Connection";
import { useOutletContext } from "react-router-dom";

export default function FollowersConnections() {
    const { search } = useOutletContext<{ search: string }>();
    const [followers, setFollowers]: [UserType[], any] = useState([]);
    const [following, setFollowing]: [UserType[], any] = useState([]);

    useEffect(() => {
        getUserFollowing(search)
            .then((data) => {
                setFollowing(data)
            })
        getUserFollowers(search)
            .then((data) => {
                setFollowers(data)
            })
    }, [search])

    return (
        followers.map((connection: UserType) => {
            return <Connection key={connection.id} connection={connection} following={following} setFollowing={setFollowing} />
        })
    )
}
