// src/components/ProjectCard.jsx

const ProjectCard = ({ project }) => {
  // Safely access nested properties using optional chaining (?.)
  const floorPrice = project.floorAsk?.price?.amount?.decimal || 'N/A';
  const imageUrl = project.image || 'https://placehold.co/300x300/1a1a1a/ffffff?text=No+Image';

  return (
    <article className="project-card">
      <img src={imageUrl} alt={project.name} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{project.name}</h3>
        <p className="card-description">{project.description}</p>
        <div className="card-stats">
          <span>Floor: {floorPrice}</span>
          <span>Volume: {Math.floor(project.volume?.allTime || 0)}</span>
        </div>
        <a href={`https://magiceden.io/collections/monad-testnet/${project.collectionId}`} target="_blank" rel="noopener noreferrer" className="card-link">
          View on Magic Eden
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;