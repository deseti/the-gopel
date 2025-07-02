// src/components/Footer.jsx

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} The Gøpel. A community tool for the Monad Ecosystem.</p>
    </footer>
  );
};

export default Footer;