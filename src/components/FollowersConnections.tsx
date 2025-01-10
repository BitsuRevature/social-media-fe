import { useEffect, useState } from "react"
import { getUserFollowers } from "../util/apiHelper"
import { UserType } from '../util/types';
import Connection from "./Connection";
import { useOutletContext } from "react-router-dom";
import { Box, IconButton } from "@mui/joy";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function FollowersConnections() {
    const { search } = useOutletContext<{ search: string }>();
    const [followers, setFollowers]: [UserType[], any] = useState([]);
    const [page, setPage]: [number, any] = useState(0);
    const [size, setSize]: [number, any] = useState(5);
    const [hasNext, setHasNext]: [boolean, any] = useState(false);
    const [totalPages, setTotalPages]: [number, any] = useState(0);

    useEffect(() => {

        getUserFollowers(search)
            .then((data) => {
                setFollowers(data.users)
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
            {followers.map((connection: UserType) => {
                return <Connection key={connection.id} connection={connection}/>
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
