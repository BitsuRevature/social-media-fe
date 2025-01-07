import { useEffect, useState } from "react"
import { getAllUsers, getUserFollowing } from "../util/apiHelper"
import { UserType } from '../util/types';
import Connection from "./Connection";
import { useAppSelector } from "../app/hooks";
import { useOutletContext } from "react-router-dom";

export default function SearchConnections() {
    const authStore = useAppSelector(store => store.auth);
    const { search } = useOutletContext<{ search: string }>();
    const [connections, setConnections]: [UserType[], any] = useState([]);
    const [following, setFollowing]: [UserType[], any] = useState([]);

    useEffect(() => {
        getAllUsers(search)
            .then((data) => {
                setConnections(data.filter(c => c.id != authStore.auth?.id))
            })
        getUserFollowing(search)
            .then((data) => {
                setFollowing(data)
            })
    }, [search])

    return (
        connections.map((connection: UserType) => {
            return <Connection key={connection.id} connection={connection} following={following} setFollowing={setFollowing} />
        })
    )
}