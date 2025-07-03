// src/pages/TopCollectionsPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.jsx';

const TopCollectionsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // This is the new API endpoint for top collections
        const url = 'https://api-mainnet.magiceden.dev/v3/rtp/monad-testnet/collections/top';
        
        const response = await axios.get(url, {
          params: {
            limit: 20,
            window: '1d' // Can be '1d', '7d', '30d'
          }
        });
        
        if (response.data && response.data.collections) {
          setProjects(response.data.collections);
        }

      } catch (err) {
        console.error("Failed to fetch top collections:", err);
        setError("Failed to load top projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="page-container"><h2>Loading Top Collections...</h2></div>;
  }

  if (error) {
    return <div className="page-container"><h2>Error</h2><p>{error}</p></div>;
  }

  return (
    <div className="page-container">
      <h2>Top Collections (Last 24 Hours)</h2>
      <section className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.collectionId} project={project} />
        ))}
      </section>
    </div>
  );
};

export default TopCollectionsPage;