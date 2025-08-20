import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="h-12 bg-blue-500 mb-6 text-white font-bold shadow-amber-100 shadow-md flex justify-around items-center">
        <Link to="/" className="shadow-amber-100 shadow-md">Vocabulary</Link>
        <Link to="/verbtobe">Verb To Be</Link>
        <Link to="/verbtohave">Verb To Have</Link>
        <Link to="/wordsoftheweek">Words Of The Week</Link>
      </nav>
    </>
  );
};

export default Nav;
