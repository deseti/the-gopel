// src/pages/HomePage.jsx - DENGAN FITUR SEARCH

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.jsx';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. STATE BARU UNTUK MENYIMPAN INPUT PENCARIAN
  const [searchTerm, setSearchTerm] = useState('');

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

  // 2. LOGIKA UNTUK MEMFILTER PROYEK
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="page-container"><h2>Loading Projects...</h2></div>;
  }

  if (error) {
    return <div className="page-container"><h2>Error</h2><p>{error}</p></div>;
  }

  return (
    <div className="page-container">
      <h2>Ecosystem Projects</h2>

      {/* 3. KOTAK PENCARIAN (SEARCH BAR) */}
      <input 
        type="text"
        placeholder="Search projects by name..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <section className="projects-grid">
        {/* 4. MENAMPILKAN HASIL YANG SUDAH DIFILTER */}
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.collectionId || index} project={project} />
        ))}
      </section>
    </div>
  );
};

export default HomePage;