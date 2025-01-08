import { useEffect } from "react";
import { getPosts } from "../features/post/postSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Posts from "./Posts";

export default function Discover() {

    const postStore = useAppSelector((store) => store.post);

    const dispatch = useAppDispatch();

    // For getting post when we first load the page
    useEffect(() => {
        dispatch(getPosts(""));
    }, [])

    return (
        <>
            {!postStore.isLoading && <Posts posts={postStore.posts} heading="Discover" />}
        </>
    )
}