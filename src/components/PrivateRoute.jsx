import { useCookies } from "react-cookie";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();

    if (!cookies.token) {
      navigate("/login");
    } else {
        return <Outlet />;
    }

    return null;
};

export default PrivateRoute;
