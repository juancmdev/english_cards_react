import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";




const EditCard = () => {
    const { id } = useParams();

    const [card, setCard] = useState(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
            const response = await fetch(`http://localhost:3001/cards/${id}`);
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
     
  return <div></div>;
};

export default EditCard;
