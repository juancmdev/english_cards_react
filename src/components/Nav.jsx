import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <Link to="/">Vocabulary</Link>
        <Link to="/verbtobe">Verb To Be</Link>
        <Link to="/verbtohave">Verb To Have</Link>
        <Link to="/wordsoftheweek">Words Of The Week</Link>
      </nav>
    </>
  );
};

export default Nav;
