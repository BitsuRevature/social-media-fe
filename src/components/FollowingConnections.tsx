import { useEffect, useState } from "react"
import { getUserFollowing } from "../util/apiHelper"
import { UserType } from '../util/types';
import Connection from "./Connection";
import { useOutletContext } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, IconButton } from "@mui/joy";

export default function FollowingConnections() {
    const { search } = useOutletContext<{ search: string }>();
    const [following, setFollowing]: [UserType[], any] = useState([]);
    const [page, setPage]: [number, any] = useState(0);
    const [size, setSize]: [number, any] = useState(5);
    const [hasNext, setHasNext]: [boolean, any] = useState(false);
    const [totalPages, setTotalPages]: [number, any] = useState(0);

    useEffect(() => {
        getUserFollowing(search)
            .then((data) => {
                setFollowing(data.users)
                setHasNext(data.hasNext);
                setTotalPages(data.totalPages);
            })
    }, [search])

    function handlePrev() {
        if (page == 0) {
            return;
        }
        setPage(page - 1);
    }

    function handleNext() {
        if (!hasNext) {
            return;
        }
        setPage(page + 1);
    }

    return (
        <>
            {following.map((connection: UserType) => {
                return <Connection key={connection.id} connection={connection} />
            })}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <IconButton
                    onClick={handlePrev}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                {`${page + 1}/${totalPages}`}
                <IconButton
                    onClick={handleNext}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </>
    )
}
