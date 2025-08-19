import { useState } from "react";
import Flashcard from "./Flashcard";


const CardApp = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const cadsPerPage = 8;

    const cardData = [
        {
        english: "Hello",
        spanish: "Hola",
    },  {
        english: "Dog",
        spanish: "Perro",
    },  {
        english: "Cat",
        spanish: "Gato",
    },  {
        english: "Tree",
        spanish: "Árbol",
    },  {
        english: "House",
        spanish: "Casa",
    },  {
        english: "Car",
        spanish: "Coche",
    },  {
        english: "Book",
        spanish: "Libro",
    },  {
        english: "Phone",
        spanish: "Teléfono",
    },  {
        english: "Sun",
        spanish: "Sol",
    },  {
        english: "Moon",
        spanish: "Luna",
    },  {
        english: "Star",
        spanish: "Estrella",
    },  {
        english: "Tree",
        spanish: "Árbol",
    },  {
        english: "House",
        spanish: "Casa",
    },  {
        english: "Car",
        spanish: "Coche",
    },  {
        english: "Book",
        spanish: "Libro",
    },  {
        english: "Phone",
        spanish: "Teléfono",
    },  {
        english: "Sun",
        spanish: "Sol",
    },
    
];

     const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledCards = shuffleArray([...cardData]);


    const startIndex = currentPage * cadsPerPage;
    const endIndex = startIndex + cadsPerPage;
    const currentCards = shuffledCards.slice(startIndex, endIndex);

  return (
    <div className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {currentCards.map((card, index) => (
        <Flashcard key={index} cardData={card} />
      ))}
    </div>
  );
};

export default CardApp;