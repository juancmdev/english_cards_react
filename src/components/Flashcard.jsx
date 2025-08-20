import { useState } from "react";

const Flashcard = ({ cardData }) => {
const [isFlipped, setIsFlipped] = useState(false);
const { english, spanish } = cardData;

return (
    <>
        <div className={`text-4xl font-bold h-80 w-80 cursor-pointer bg-white rounded-xl shadow-lg relative [perspective:1000px] [transform-style:preserve-3d] transition-transform duration-500 ease-in-out mx-auto ${isFlipped ? "rotate-y-180" : ""}`}
            onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`front absolute top-0 left-0 [backface-visibility:hidden] flex justify-center items-center h-full w-full transform -rotate-y-360`}>
                {spanish}
            </div>
            <div className={`back [backface-visibility:hidden] absolute top-0 left-0  flex justify-center items-center h-full w-full transform -rotate-y-180`}>
                {english}
            </div>
        </div>
    </>
    );
};

export default Flashcard;