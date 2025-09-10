import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login", { replace: true });
    }
  }, [cookies, navigate]);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
  };

  return (
    <>
      <h1 className="text-3xl font-bold mx-auto text-center mt-4">
        Hello to Admin Page
      </h1>
      <div className="container" style={{ backgroundColor: "yellow", width: "1000px", height: "300px", margin: "auto", padding: "20px" }}>
        <div className="add-card flex">
          <h2 className="text-xl font-bold mr-3">Add new Card</h2>
          <Link to={'/ingresartarjeta'} >
          <img
            src="src/assets/iconos/ingresar-datos.png"
            alt="icono-ingresar-datos"
            className="w-6 h-6"
          />
          </Link>
          
        </div>
        <div className="update-card flex">
          <h2 className="text-xl font-bold mr-3">Update Card</h2>
          <img
            src="src\assets\iconos\update.png"
            alt="icono-ingresar-datos"
            className="w-6 h-6"
          />
        </div>
        <div className="delete-card flex">
          <h2 className="text-xl font-bold mr-3">Delete Card</h2>
          <img
            src="src\assets\iconos\delete-icon.png"
            alt="icono-ingresar-datos"
            className="w-6 h-6"
          />
        </div>
      </div>

      <button
        className="w-30 h-10 text-white rounded-md font-bold p-2 mb-4 mt-4 block mx-auto bg-amber-500 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
};

export default Admin;
