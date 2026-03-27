import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { useExperience } from '../../context/ExperienceContext';

export default function MobileStickyCTA() {
  const navigate = useNavigate();
  const { selectedProduct } = useExperience();

  if (!selectedProduct) return null;

  return (
    <div className="mobile-sticky-cta">
      <div>
        <div className="eyebrow">Selected Garment</div>
        <strong>{selectedProduct.name}</strong>
      </div>
      <button type="button" className="primary-button" onClick={() => navigate(ROUTES.ar)}>Try in AR</button>
    </div>
  );
}
