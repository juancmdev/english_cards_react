import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Categorias from "./pages/Categorias";
import VerbToBe from "./pages/VerbToBe";
import VerbToHave from "./pages/VerbToHave";
import WordsOfTheWeek from "./pages/WordsOfTheWeek";
import IngresarTarjeta from "./components/IngresarTarjeta";
import Vocabulary from "./pages/Vocabulary";
import Home from "./pages/Home";
import Login from "./components/Login";
import Admin from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <>
      <CookiesProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/verbtobe" element={<VerbToBe />} />
            <Route path="/verbtohave" element={<VerbToHave />} />
            <Route path="/wordsoftheweek" element={<WordsOfTheWeek />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/ingresartarjeta" element={<IngresarTarjeta />} />
            </Route>
          </Routes>
        </Layout>
      </CookiesProvider>
    </>
  );
}

export default App;
