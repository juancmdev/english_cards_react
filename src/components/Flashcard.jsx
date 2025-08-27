import { useState, useEffect } from "react";

const Flashcard = ({ cardData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { english, spanish, urlImage } = cardData;

  // Lógica de useEffect para el temporizador
  useEffect(() => {
    let timeoutId;
    if (isFlipped) {
      timeoutId = setTimeout(() => {
        setIsFlipped(false);
      }, 2000); // Voltea de vuelta después de 5 segundos
    }

    // Función de limpieza para cancelar el temporizador si el componente se desmonta
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFlipped]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

 

  return (
         <>
            <div className={`text-4xl mt-6 mb-6 font-bold h-80 w-80 cursor-pointer bg-white rounded-xl shadow-lg relative [perspective:1000px] [transform-style:preserve-3d] transition-transform duration-500 ease-in-out mx-auto ${isFlipped ? "rotate-y-180" : ""}`}
                onClick={handleFlip}>
  

            <div className={`front p-6 absolute top-0 left-0 [backface-visibility:hidden] flex justify-center items-center h-full w-full transform -rotate-y-360`}>
              <div className="flex flex-col items-center">
                <div className="text-2xl">
                  {spanish}
                </div>
                <div>
                  {urlImage && (
                    <img src={urlImage} alt={spanish} className="mt-4 max-h-56 max-w-full rounded-4xl" />
                  )}
                </div>
                
            </div>
            </div>
                  
                <div className={`back [backface-visibility:hidden] absolute top-0 left-0  flex justify-center items-center h-full w-full transform -rotate-y-180`}>
                    {english}
                </div>
            </div>
        </>
        );
    };

export default Flashcard;