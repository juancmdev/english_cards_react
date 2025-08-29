import { useCookies } from "react-cookie";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    // Si la cookie no existe, redirige al login
    if (!cookies.token) {
      navigate("/login");
    }
  }, [cookies.token, navigate]);

  // Si la cookie existe, renderiza el Outlet
  if (cookies.token) {
    return <Outlet />;
  }

  // Si no hay cookie, renderiza null para que no aparezca nada temporalmente
  return null;
};

export default PrivateRoute;
