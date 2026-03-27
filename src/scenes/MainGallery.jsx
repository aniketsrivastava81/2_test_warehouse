import { useNavigate } from 'react-router-dom';
import { products } from '../config/products';
import { ROUTES } from '../config/routes';
import GallerySpace from '../components/3d/GallerySpace';
import TShirtModel from '../components/3d/TShirtModel';
import VaultDoor from '../components/3d/VaultDoor';
import PortalGate from '../components/3d/PortalGate';

const layout = [
  { id: 'core-midnight-thread', position: [-3.6, 1.5, -0.8], rotation: [0.05, 0.18, -0.08] },
  { id: 'core-atelier-stone', position: [3.4, 1.45, 0.1], rotation: [-0.05, -0.22, 0.09] },
  { id: 'esclusivo-verdant-code', position: [-0.4, 1.7, 2.4], rotation: [0.1, 0.12, -0.05] },
];

export default function MainGalleryScene({ showcaseOnly = false }) {
  const navigate = useNavigate();

  return (
    <group>
      <GallerySpace />
      {layout.map((item) => {
        const product = products.find((entry) => entry.id === item.id);
        return <TShirtModel key={item.id} product={product} position={item.position} rotation={item.rotation} scale={1.1} />;
      })}
      {!showcaseOnly ? <VaultDoor onEnter={() => navigate(ROUTES.vault)} /> : null}
      {!showcaseOnly ? <PortalGate label="Organic Oasis" slug="organic-oasis" position={[-6.5, 2.2, -4.8]} onEnter={() => navigate(ROUTES.organic)} /> : null}
      {!showcaseOnly ? <PortalGate label="Urban Canvas" slug="urban-canvas" position={[0, 2.2, -4.8]} onEnter={() => navigate(ROUTES.urban)} /> : null}
      {!showcaseOnly ? <PortalGate label="Abstract Dreamscape" slug="abstract-dreamscape" position={[6.5, 2.2, -4.8]} onEnter={() => navigate(ROUTES.abstract)} /> : null}
    </group>
  );
}
