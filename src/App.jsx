import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Categorias from "./pages/Categorias";
import VerbToBe from "./pages/VerbToBe";
import VerbToHave from "./pages/VerbToHave";
import WordsOfTheWeek from "./pages/WordsOfTheWeek";
import IngresarTarjeta from "./components/IngresarTarjeta";
import Vocabulary from "./pages/Vocabulary";
import Home from "./pages/Home";


function App() {
  return (
    <>
      <Layout>
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/vocabulary" element={<Vocabulary />} />
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
