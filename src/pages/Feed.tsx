import { useEffect, useState } from "react";
import Posts from "./Posts";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getFeed } from "../features/post/postSlice";

export default function Feed() {
    const [isLoading, setIsLoading] = useState(true);
    const posts = useAppSelector(store => store.post.posts)
    const dispatch = useAppDispatch();


    // For getting post when we first load the page
    useEffect(() => {
        dispatch(getFeed(""))
        setIsLoading(false);
    }, [])

    return (
        <>
            {!isLoading && <Posts posts={posts} heading="Feed" />}
        </>
    )
}