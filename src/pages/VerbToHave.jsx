import { useState, useEffect } from "react";
import Flashcard from "../components/Flashcard";
import { Link } from "react-router-dom";

const VerbToHave = () => {
  const [shuffledCards, setShufledCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cadsPerPage = 8;

  // Función para mezclar las tarjetas (ahora usa el estado `shuffledCards`)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleShuffle = () => {
    setShufledCards(shuffleArray([...shuffledCards])); // Creamos una copia para evitar mutar el estado directamente
  };

  useEffect(() => {
    fetch("http://localhost:5000/cards?category=tohave")
      .then((response) => {
        if (!response.ok) {
          throw new Error("La respuesta de la red no fue correcta.");
        }
        return response.json();
      })
      .then((data) => {
        setShufledCards(data);
      })
      .catch((error) => {
        console.error("Hubo un problema con la petición:", error);
      });
  }, []);

  const startIndex = currentPage * cadsPerPage;
  const endIndex = startIndex + cadsPerPage;
  const currentCards = shuffledCards.slice(startIndex, endIndex);

  return (
    <>
      <div className="mx-auto grid text-center sm:grid-cols-2 whitespace-pre-line md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentCards.map((card, index) => (
          <Flashcard key={index} cardData={card} />
        ))}
      </div>
      <div className="flex justify-center p-4">
        <button
          onClick={handleShuffle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Mezclar
        </button>
      </div>

      <Link
        to={"/IngresarTarjeta"}
        className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded cursor-pointer mb-6 mx-auto block w-36"
      >
        Nueva tarjeta
      </Link>
    </>
  );
};

export default VerbToHave;
