// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-left">
        <h1>The Gøpel</h1>
        <nav>
          <Link to="/">Project Hub</Link>
          {/* Kita bisa tambahkan link lain di sini nanti */}
        </nav>
      </div>
      <div className="header-right">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;