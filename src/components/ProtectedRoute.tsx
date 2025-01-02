import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import ContentWithSidebar from "../pages/ContentWithSidebar";

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const authStore = useAppSelector(store => store.auth);

    useEffect(() => {
        if (authStore.auth == null) navigate("/login");
    }, [authStore.auth]);

    return (
        <>
            {authStore.auth != null &&
                <ContentWithSidebar>
                    <Outlet />
                </ContentWithSidebar>
            }
        </>
    )
}

export default ProtectedRoute;
