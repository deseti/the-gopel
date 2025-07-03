// src/pages/HomePage.jsx - KODE DENGAN PERBAIKAN FINAL

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.jsx';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = '/api/v3/rtp/monad-testnet/collections/v7';
        const response = await axios.get(url, {
          params: {
            limit: 20,
            sortBy: 'allTimeVolume'
          }
        });

        // DEBUG: Mari kita lihat data mentah dari API di console browser
        console.log("Raw API Data:", response.data.collections);

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
        {/* INI PERBAIKANNYA: Menggunakan index sebagai fallback key */}
        {projects.map((project, index) => (
          <ProjectCard key={project.collectionId || index} project={project} />
        ))}
      </section>
    </div>
  );
};

export default HomePage;