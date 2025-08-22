import { useState } from "react";

const IngresarTarjeta = () => {

  const [spanish, setSpanish] = useState("");
  const [english, setEnglish] = useState("");
  const [category, setCategory] = useState("");


  return <>
    <div className="bg-gray-100 p-6">

    <h1 className="text-4xl text-center font-bold mb-6">Ingresar Nueva Tarjeta</h1>
    <form action="" className="flex flex-col  items-center justify-center gap-4 w-80 mx-auto mb-6 pt-10 pb-10 bg-white rounded-xl">
      <input type="text" name="spanish" placeholder="Parlabra en Español" id="" className="border border-black rounded p-1"/>
      <input type="text" name="english" placeholder="Parlabra en Inglés" id="" className="border border-black rounded p-1"/>
      <input type="text" name="category" placeholder="Categoría" id="" className="border border-black rounded p-1"/>
      <input type="submit" value="Insertar"  className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"/>
    </form>
    </div>
  </>;
};

export default IngresarTarjeta;
