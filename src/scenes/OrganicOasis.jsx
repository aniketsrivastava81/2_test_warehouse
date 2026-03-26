import { Html } from '@react-three/drei';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GallerySpace from '../components/3d/GallerySpace';
import PortalGate from '../components/3d/PortalGate';
import { products } from '../config/products';
import { ROUTES } from '../config/routes';
import TShirtModel from '../components/3d/TShirtModel';
import { useExperience } from '../context/ExperienceContext';

export default function OrganicOasis() {
  const navigate = useNavigate();
  const { markPuzzleSolved, progress, dismissIntro } = useExperience();
  const [foundFlowers, setFoundFlowers] = useState([]);
  const flowers = useMemo(() => [[-3, 0.5, -1], [1.2, 0.5, 1], [3.4, 0.5, -0.5]], []);
  const introSeen = progress.introDismissed?.includes('organic-oasis');

  const handleFlowerClick = (index) => {
    setFoundFlowers((current) => {
      const next = Array.from(new Set([...current, index]));
      if (next.length === 3) markPuzzleSolved('organic-oasis');
      return next;
    });
  };

  return (
    <group>
      {!introSeen ? (
        <Html center>
          <div className="intro-card">
            <p className="eyebrow">Organic Oasis</p>
            <h3>Find 3 hidden flowers to unlock the eco reward.</h3>
            <button type="button" className="primary-button" onClick={() => dismissIntro('organic-oasis')}>Begin</button>
          </div>
        </Html>
      ) : null}
      <GallerySpace tint="#0f2317" particleColor="#9be37a" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[38, 38]} />
        <meshStandardMaterial color="#244b24" />
      </mesh>
      {flowers.map((position, index) => (
        <group key={index} position={position} onClick={() => handleFlowerClick(index)}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={foundFlowers.includes(index) ? '#ffe783' : '#f690d4'} emissive={foundFlowers.includes(index) ? '#ffe783' : '#f690d4'} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, -0.32, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.45, 12]} />
            <meshStandardMaterial color="#6fb45d" />
          </mesh>
        </group>
      ))}
      <mesh position={[-4.8, 2.3, -2.6]}><coneGeometry args={[1.2, 3.5, 8]} /><meshStandardMaterial color="#4f7b40" /></mesh>
      <mesh position={[4.8, 2.1, -1.8]}><coneGeometry args={[1.4, 3.8, 8]} /><meshStandardMaterial color="#537f45" /></mesh>
      <TShirtModel product={products[2]} position={[0, 1.55, 0]} scale={1.1} />
      <Html position={[0, 3.8, 0]}><button type="button" className="ghost-button" onClick={() => setFoundFlowers([])}>Reset puzzle</button></Html>
      <PortalGate label="Return to Gallery" slug="return" position={[0, 2.2, -5.6]} onEnter={() => navigate(ROUTES.home)} />
    </group>
  );
}
