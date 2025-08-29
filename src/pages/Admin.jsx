import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    }
  }, []);


  return (
    <>
      <h1 className="text-3xl font-bold ">Hello to Admin Page</h1>
      <button className="">Logout</button>
    </>
  );
};

export default Admin;
