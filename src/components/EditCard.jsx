import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const EditCard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Validamos si los campos están vacíos
    if (!card.spanish || !card.english) {
      setMessage("Por favor, completa los campos de Spanish e English.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return; // Detenemos la función si la validación falla
    }
    const { _id, ...updateCard } = card;

    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/cards/${_id}`, {
        method: "PUT", // ⬅️ Método HTTP para actualizar
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCard), // ⬅️ Enviamos los datos del estado
      });

      if (!response.ok) {
        setMessage("Ocurrió un error. Revisa la consola."); // ⬅️ Mensaje de error del lado del cliente
        setTimeout(() => {
          setMessage("");
        }, 3000);

        throw new Error("No se pudo actualizar la tarjeta");
      } else {
        setMessage("Tarjeta actualizada exitosamente"); // ⬅️ Mensaje de éxito del lado del cliente
        setTimeout(() => {
          setMessage("");
          navigate("/managecards");
        }, 3000);
      }

      // Opcional: Si la actualización fue exitosa, puedes redirigir al usuario
      // por ejemplo: navigate('/manage-cards');
      console.log("Tarjeta actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar la tarjeta:", error);
    }
  };

  const { id } = useParams();

  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`http://localhost:5000/cards/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la tarjeta");
        }
        const data = await response.json();
        setCard(data);
      } catch (error) {
        console.error("Error al obtener la tarjeta:", error);
      }
    };
    fetchCard();
  }, [id]);

  console.log(id);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">Edit Cards</h1>
      {card && (
        <form
          onSubmit={handleSubmit}
          className="bg-amber-200 w-58 h-auto flex flex-col items-center justify-center mx-auto p-6 rounded m-4"
        >
          <input
            type="text"
            name="spanish"
            placeholder="Spanish"
            value={card.spanish}
            onChange={handleChange}
            className="border border-1 border-solid border-black rounded mb-2 p-1"
          />
          <input
            type="text"
            name="english"
            placeholder="English"
            value={card.english}
            onChange={handleChange}
            className="border border-1 border-solid border-black rounded mb-2 p-1"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={card.category}
            onChange={handleChange}
            className="border border-1 border-solid border-black rounded mb-2 p-1"
          />
          <input
            type="text"
            name="image"
            placeholder="Image"
            value={card.urlImage}
            onChange={handleChange}
            className="border-1 border-solid border-black rounded mb-2 p-1"
          />
          <button
            type="submit"
            className="bg-amber-500 p-2 cursor-pointer rounded text-white font-bold w-20 m-4"
          >
            Save
          </button>
        </form>
      )}
      <Link
        to={"/managecards"}
        className="w-35 h 15 text-white text-center rounded-md font-bold p-2 mb-4 mt-4 block mx-auto bg-amber-500 cursor-pointer text-s"
      >
        Manage Cards
      </Link>
      <h2>{message}</h2>
    </>
  );
};

export default EditCard;
