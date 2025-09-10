import { useState, useEffect } from "react"

const ManageCards = () => {
const [cards, setCards] = useState([]);

    useEffect(() => {
        try {
            const fetchCards = async () => {
                const response = await fetch("http://localhost:5000/cards");
                if(!response.ok) {
                    throw new Error('No se pudo obtener la lista de tarjetas')
                }
                const data = await response.json();
                setCards(data);
            }
        } catch (error) {
            console.error('Error al cargar las tarjetas', error);
        }
        fetchCards();
    }, [])

  return (
    <div>
      <h1>Administrar Tarjetas</h1>
      {/* Aquí vamos a mostrar la lista de tarjetas */}
    </div>
  )
}

export default ManageCards
