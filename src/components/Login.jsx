import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate(); // Aquí se declara el hook

  //Agregamos este hook para manejar la redirección
  useEffect(() => {
    if (cookies.token) {
      navigate("/admin");
    }
  }, [cookies, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // ⬅️ Paso 1: Procesar la respuesta como JSON
        } else {
          throw new Error("Fallo en el inicio de sesión"); // Lanza un error para el .catch
        }
      })
      .then((data) => {
        // ⬅️ Paso 2: Usar los datos de la respuesta para establecer la cookie
        setCookie("token", data.token, { path: "/", secure: true, sameSite: "Lax" });
        console.log("Token", data.token); // ⬅️ Opcional: Para verificar en la consola
        navigate("/admin"); // ⬅️ Paso 3: Redirigir al usuario
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-gray-100 w-96 m-auto rounded-lg mt-8 mb-8 shadow-lg shadow-gray-400"
      >
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
          placeholder="Username"
          className="border border-blue-500 rounded-lg p-2"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          minLength={8}
          placeholder="Password"
          className="border border-blue-500 rounded-lg p-2"
        />
        <input
          type="submit"
          value="Login"
          className="bg-blue-500 text-white rounded-lg p-2 cursor-pointer"
        />
      </form>
    </>
  );
};

export default Login;
