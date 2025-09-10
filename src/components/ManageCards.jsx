import { useState, useEffect } from "react"

const ManageCards = () => {
const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
        try {
                const response = await fetch("http://localhost:5000/cards?limit=20");
                if(!response.ok) {
                    throw new Error('No se pudo obtener la lista de tarjetas')
                }
                const data = await response.json();
                setCards(data);
            } catch (error) {
            console.error('Error al cargar las tarjetas', error);
        };
    };
        fetchCards();
    }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">Administrar Tarjetas</h1>
      {/* Aquí vamos a mostrar la lista de tarjetas */}
        {cards.map((card) => (
            <div key={card._id}>
                <h3 className="text-xl font-bold mb-2 text-center">{card.spanish}-{card.english}</h3>
            </div>
        )
        )}
    </div>
  )
}

export default ManageCards
