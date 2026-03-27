import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { useExperience } from '../../context/ExperienceContext';
import ARTryOnLauncher from '../forms/ARTryOnLauncher';

export default function ProductOverlay() {
  const navigate = useNavigate();
  const {
    selectedProduct,
    setSelectedProductId,
    addToCart,
    setIsLoomOpen,
    unlockedProducts,
  } = useExperience();

  if (!selectedProduct) return null;

  const isLocked = selectedProduct.vaultLocked && !unlockedProducts[selectedProduct.id];

  return (
    <aside className="product-overlay" aria-label="Selected product details">
      <button type="button" className="overlay-close" onClick={() => setSelectedProductId(null)} aria-label="Close product details">×</button>
      <p className="eyebrow">{selectedProduct.collection} Collection</p>
      <h2>{selectedProduct.name}</h2>
      <p>{selectedProduct.description}</p>
      <div className="product-facts">
        <span>{selectedProduct.fabricWeight}</span>
        <span>{selectedProduct.threadCount} Thread Count</span>
        <span>${selectedProduct.price}</span>
      </div>
      <div className="button-stack">
        <button type="button" className="primary-button" disabled={isLocked} onClick={() => addToCart(selectedProduct)}>
          {isLocked ? 'Unlock in Vault' : 'Add to Cart'}
        </button>
        <button type="button" className="ghost-button" onClick={() => setIsLoomOpen(true)}>Stress Test the Fabric</button>
        <button type="button" className="ghost-button" onClick={() => navigate(ROUTES.cloud)}>Enter Cotton Cloud</button>
      </div>
      <ARTryOnLauncher compact />
      <div className="size-pills">
        {selectedProduct.sizes.map((size) => <span key={size}>{size}</span>)}
      </div>
    </aside>
  );
}
