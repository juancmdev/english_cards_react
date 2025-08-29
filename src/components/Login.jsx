import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Aquí se declara el hook

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
    })
      .then((res) => {
        if (res.ok) {
          // console.log(
          //   "¡Login exitoso! El servidor envió la respuesta correcta."
          // );
          navigate("/admin");
          // La respuesta del servidor fue exitosa (código 200-299)
          // Redirige al usuario a la página de administración
          // navigate("/admin");
        } else {
          // La respuesta del servidor indica un error (ej. 401)
          console.error("Fallo en el inicio de sesión");
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
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
          className="bg-blue-500 text-white rounded-lg p-2"
        />
      </form>
    </>
  );
};

export default Login;
