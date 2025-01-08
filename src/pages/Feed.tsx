import { useEffect, useState } from "react";
import Posts from "./Posts";
import axios from "../config/axiosConfig";

export default function Feed() {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    // For getting post when we first load the page
    useEffect(() => {
        axios.get('/posts/feed?search=')
            .then(res => {
                setPosts(res.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    return (
        <>
            {!isLoading && <Posts posts={posts} heading="Feed" />}
        </>
    )
}