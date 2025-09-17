import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ManageCards = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleEdit = (cardId) => {
    navigate(`/editartarjeta/${cardId}`);
  };

  const handleDelete = async (cardId) => {
    try {
      const response = await fetch(`http://localhost:5000/cards/${cardId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCards(cards.filter((card) => card._id !== cardId));
        setMessage("Tarjeta eliminada exitosamente");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        // Si el servidor respondió con un error
        setMessage("Error al eliminar la tarjeta");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        throw new Error("No se pudo eliminar la tarjeta");
      }
    } catch (error) {
      console.error("Error al eliminar la tarjeta", error);
      setMessage("Ocurrió un error. Revisa la consola."); // ⬅️ Mensaje de error del lado del cliente
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        let url = "http://localhost:5000/cards?limit=20";

        // Si el usuario ha escrito algo, agregamos el parámetro de búsqueda a la URL
        if (search) {
          url += `&search=${search}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de tarjetas");
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error al cargar las tarjetas", error);
      }
    };
    fetchCards();
  }, [search]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">
        Administrar Tarjetas
      </h1>
      <input
        className="w-64 h-9 p-2 border-1 border-solid border-black rounded block mx-auto mb-4"
        type="text"
        name="search"
        placeholder={"Buscar"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Aquí vamos a mostrar la lista de tarjetas */}
      {cards.map((card) => (
        <div key={card._id}>
          <div className="text-xl font-bold mb-2 text-center">
            {card.spanish}-{card.english}
            <button onClick={() => handleDelete(card._id)}>
              <img
                src="src\assets\iconos\delete-icon.png"
                alt="icono-ingresar-datos"
                className="w-5 h-5 ml-2 mr-2 cursor-pointer"
              />
            </button>
            <button onClick={() => handleEdit(card._id)}>
              <img
                src="src\assets\iconos\update.png"
                alt="icono-ingresar-datos"
                className="w-5 h-5 ml-2 mr-2 cursor-pointer"
              />
            </button>
          </div>
        </div>
      ))}
      <Link
        to={"/admin"}
        className="w-30 h 15 text-white text-center rounded-md font-bold p-2 mb-4 mt-4 block mx-auto bg-amber-500 cursor-pointer"
      >
        Admin
      </Link>
      <h2 className="text-center text-3xl bg-amber-400 p-4 mt-4">{message}</h2>
    </div>
  );
};

export default ManageCards;
