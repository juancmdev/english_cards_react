import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const handleChange = (e) => {
  setCard({ ...card, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
};

const EditCard = () => {
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
      {card && (
        <form onSubmit={handleSubmit} className="bg-amber-200 w-58 h-auto flex flex-col items-center justify-center mx-auto p-6 rounded m-4">
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
            className="border border-1 border-solid border-black rounded mb-2 p-1"
          />
          <button type="submit" className="bg-amber-500 p-2 cursor-pointer rounded text-white font-bold w-20 m-4">Save</button>
        </form>
      )}
    </>
  );
};

export default EditCard;
