import { useEffect, useState } from "react"
import { getUserConnections } from "../util/apiHelper"
import { UserType } from '../util/types';
import Connection from "./Connection";
import { useOutletContext } from "react-router-dom";

export default function FollowingConnections() {
    const { search } = useOutletContext<{ search: string }>();
    const [following, setFollowing]: [UserType[], any] = useState([]);
    
    useEffect(() => {
        getUserConnections(search)
        .then((data) => {
            setFollowing(data)
        })
    }, [search])

    return (
        following.map((connection: UserType) => {
            return <Connection key={connection.id} connection={connection} following={following} setFollowing={setFollowing} />
        })
    )
}
