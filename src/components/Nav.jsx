import { Link } from "react-router-dom";

const links = [
  { text: "Vocabulary", path: "/vocabulary", id: 1 },
  { text: "Verb To Be", path: "/verbtobe", id: 2 },
  { text: "Verb To Have", path: "/verbtohave", id: 3 },
  { text: "Words Of The Week", path: "/wordsoftheweek", id: 4},
];


const Nav = () => {
  return (
    <>
      <nav className="h-12 bg-blue-500 mb-6 text-white font-bold shadow-amber-100 shadow-md flex justify-around items-center">
        {links.map((link) => (<Link key={link.id} to={`${link.path}`}>{link.text}</Link>))}
      </nav>
    </>
  );
};

export default Nav;


