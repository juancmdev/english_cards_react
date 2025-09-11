import { useState, useEffect } from "react";

const ManageCards = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");

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
      <div className="searchBar flex items-center justify-center border-1 border-solid border-black rounded w-72 h-9 mx-auto mb-4">
        <input
          className="w-64 h-9 p-2"
          type="text"
          name="search"
          placeholder={"Buscar"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-icon">
            <img src="src/assets/iconos/search.png" alt="search-icon" className="w-10 h-10 p-1 cursor-pointer"/>
        </div>
      </div>

      {/* Aquí vamos a mostrar la lista de tarjetas */}
      {cards.map((card) => (
        <div key={card._id}>
          <h3 className="text-xl font-bold mb-2 text-center">
            {card.spanish}-{card.english}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ManageCards;
