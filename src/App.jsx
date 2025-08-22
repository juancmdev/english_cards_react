import { Route, Routes } from "react-router-dom";
import CardApp from "./components/CardApp";
import Layout from "./components/Layout";
import Categorias from "./pages/Categorias";
import VerbToBe from "./pages/VerbToBe";
import VerbToHave from "./pages/VerbToHave";
import WordsOfTheWeek from "./pages/WordsOfTheWeek";
import IngresarTarjeta from "./components/IngresarTarjeta";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/vocabulary" element={<CardApp />} />
          <Route path="/verbtobe" element={<VerbToBe />} />
          <Route path="/verbtohave" element={<VerbToHave />} />
          <Route path="/wordsoftheweek" element={<WordsOfTheWeek />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ingresartarjeta" element={<IngresarTarjeta/>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
