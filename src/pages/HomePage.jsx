// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.jsx';

const HomePage = () => {
  // State to store our data, loading status, and errors
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // URL-nya tetap sama
        const url = 'https://api-mainnet.magiceden.dev/v3/rtp/monad-testnet/collections/v7';

        // Panggilan Axios sekarang lebih simpel, tanpa headers
        const response = await axios.get(url, {
          params: {
            limit: 20,
            sortBy: 'allTimeVolume'
          }
        });
        
        if (response.data && response.data.collections) {
          setProjects(response.data.collections);
        }

      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Conditional Rendering based on state
  if (loading) {
    return <div className="page-container"><h2>Loading Projects...</h2></div>;
  }

  if (error) {
    return <div className="page-container"><h2>Error</h2><p>{error}</p></div>;
  }

  return (
    <div className="page-container">
      <h2>Ecosystem Projects</h2>
      <section className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.collectionId} project={project} />
        ))}
      </section>
    </div>
  );
};

export default HomePage;