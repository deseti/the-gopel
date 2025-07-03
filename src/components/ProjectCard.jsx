// src/components/ProjectCard.jsx


const ProjectCard = ({ project }) => {
  const floorPrice = project.floorAsk?.price?.amount?.decimal;
  const floorSymbol = project.floorAsk?.price?.currency?.symbol || 'MON';
  const volume = project.volume?.allTime;
  const imageUrl = project.image || 'https://placehold.co/300x300/1a1a1a/ffffff?text=No+Image';
  const onSale = project.onSaleCount;
  const supply = project.tokenCount || project.supply;
  const isVerified = project.magicedenVerificationStatus === 'verified';
  const description = project.description ? project.description.slice(0, 120) + (project.description.length > 120 ? '…' : '') : '';
  const collectionId = project.collectionId || project.id;
  const hasMagicEden = !!collectionId;

  return (
    <article className="project-card">
      <img src={imageUrl} alt={project.name} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">
          {project.name}
          {isVerified && <span title="Verified" style={{ color: '#9F5FFF', marginLeft: 8, fontSize: '1.1em' }}>✔️</span>}
        </h3>
        {description && <p className="card-description" title={project.description}>{description}</p>}
        <div className="card-stats">
          <span>Floor: {floorPrice !== undefined ? `${floorPrice} ${floorSymbol}` : 'N/A'}</span>
          <span>Volume: {volume !== undefined ? `${Math.floor(volume)} MON` : 'N/A'}</span>
        </div>
        <div className="card-stats">
          <span>On Sale: {onSale ?? 'N/A'}</span>
          <span>Supply: {supply ?? 'N/A'}</span>
        </div>
        <div className="card-link">
          {hasMagicEden ? (
            <a href={`https://magiceden.io/collections/monad-testnet/${collectionId}`} target="_blank" rel="noopener noreferrer">
              View on Magic Eden
            </a>
          ) : (
            <span style={{ color: '#666', opacity: 0.7 }}>Not available on Magic Eden</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;