import { useState, useEffect } from "react"

const ManageCards = () => {
const [cards, setCards] = useState([]);
const [search, setSearch] = useState('');


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
        <input 
        className="w-64 h-9 border-1 border-solidborder-black rounded p-2 mb-4 block mx-auto"
        type="text" 
        name="search" 
        placeholder="Buscar" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        />
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
