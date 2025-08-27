import { Link } from "react-router-dom";


const links = [
  { 
    text: "Home", 
    path: "/", 
    id: 0, 
    icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" 
  },
  { text: "Vocabulary", path: "/vocabulary", id: 1 },
  { text: "Verb To Be", path: "/verbtobe", id: 2 },
  { text: "Verb To Have", path: "/verbtohave", id: 3 },
  { text: "Words Of The Week", path: "/wordsoftheweek", id: 4},
];

const icons = `<svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
<path d="${links[0].text}"></path>
</svg>`


const Nav = () => {
  return (
    <>
      <nav className="h-12 bg-blue-500 text-white font-bold shadow-amber-100 shadow-md flex justify-around items-center">
        {links.map((link) => (<Link key={link.id} to={`${link.path}`}>{link.text}</Link>))}
      </nav>
    </>
  );
};

export default Nav;


