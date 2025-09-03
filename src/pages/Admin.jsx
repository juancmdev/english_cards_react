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
      <h1 className="text-3xl font-bold mx-auto text-center mt-4">Hello to Admin Page</h1>
      <button className="w-30 h-10 text-white rounded-md font-bold p-2 mb-4 mt-4 block mx-auto bg-amber-500 cursor-pointer">Logout</button>
    </>
  );
};

export default Admin;
