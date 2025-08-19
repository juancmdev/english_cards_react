import Flashcard from "./Flashcard";


const CardApp = () => {
    const cardData = {
        english: "Hello",
        spanish: "Hola",
    }
  return (
    <div>
      <Flashcard cardData = {cardData}/>
      {/* Aquí irán los controles y la lógica */}
    </div>
  );
};

export default CardApp;