// src/components/Header.jsx
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>The Gøpel</h1>
      <nav>
        <Link to="/">Project Hub</Link>
        <Link to="/top-collections">Top Collections</Link>
      </nav>
    </header>
  );
};

export default Header;