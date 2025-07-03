// src/App.jsx
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        {/* React Router will render the correct page component here */}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;