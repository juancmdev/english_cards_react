import { useState } from "react";

const Flashcard = ({ cardData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { english, spanish } = cardData;

  return (
    <>
      <div
        className={`h-80 w-80 bg-white rounded-xl shadow-lg relative [perspective:1000px] transition-transform duration-500 ease-in-out ${isFlipped ? "rotate-y-180" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`front h-80 w-80 absolute [backface-visibility:hidden] flex justify-center items-center transform transition-transform duration-500 ${isFlipped ? "rotate-y-180" : "rotate-y-0"}`}>
          {spanish}
        </div>
        <div className={`back h-80 w-80 absolute [backface-visibility:hidden] flex justify-center items-center transform transition-transform duration-500 ${isFlipped ? "rotate-y-0" : "rotate-y-180"}`}>
          {english}
        </div>
      </div>
    </>
  );
};

export default Flashcard;