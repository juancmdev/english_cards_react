import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.token) {
            navigate("/login");
          } 
    }, [cookies.token])

    if(cookies.token) return (
        <Outlet />
    )

    return null;
};

export default PrivateRoute;
