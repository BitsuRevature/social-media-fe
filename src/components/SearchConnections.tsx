import { useEffect, useState } from "react"
import { getAllUsers } from "../util/apiHelper"
import { UserType } from '../util/types';
import Connection from "./Connection";
import { useAppSelector } from "../app/hooks";
import { useOutletContext } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/joy";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function SearchConnections() {
    const authStore = useAppSelector(store => store.auth);
    const { search } = useOutletContext<{ search: string }>();
    const [connections, setConnections]: [UserType[], any] = useState([]);
    const [page, setPage]: [number, any] = useState(0);
    const [size]: [number, any] = useState(5);
    const [hasNext, setHasNext]: [boolean, any] = useState(false);
    const [totalPages, setTotalPages]: [number, any] = useState(0);

    useEffect(() => {
        getAllUsers(search, page, size)
            .then((data) => {
                setConnections(data.users.filter(c => c.id != authStore.auth?.id));
                setHasNext(data.hasNext);
                setTotalPages(data.totalPages);
            })
    }, [search, page])

    function handlePrev() {
        setPage(page - 1);
    }

    function handleNext() {
        setPage(page + 1);
    }

    return (
        <>
            {connections.map((connection: UserType) => {
                return (
                    <Connection key={connection.id} connection={connection} />
                )
            })}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    userSelect: "false",
                }}
            >
                <IconButton
                    onClick={handlePrev}
                    disabled={page == 0}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Typography sx={{ userSelect: "none" }}>{`${page + 1}/${totalPages}`}</Typography>
                <IconButton
                    onClick={handleNext}
                    disabled={!hasNext}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </>
    )
}