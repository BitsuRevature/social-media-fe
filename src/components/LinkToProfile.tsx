import { Box } from "@mui/joy"
import { useNavigate } from "react-router-dom"

type LinkToProfileProps = {
    username: string
    children: any
}

export default function LinkToProfile({ username, children }: LinkToProfileProps) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/profile/${username}`)
    }

    return (
        <Box
            onClick={handleClick}
            sx={{ cursor: "pointer" }}
        >
            {children}
        </Box>
    )
}