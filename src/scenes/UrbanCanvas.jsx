import { Html } from '@react-three/drei';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GallerySpace from '../components/3d/GallerySpace';
import PortalGate from '../components/3d/PortalGate';
import { products } from '../config/products';
import { ROUTES } from '../config/routes';
import TShirtModel from '../components/3d/TShirtModel';
import { useExperience } from '../context/ExperienceContext';

export default function UrbanCanvas() {
  const navigate = useNavigate();
  const { markPuzzleSolved, progress, dismissIntro } = useExperience();
  const [aligned, setAligned] = useState([false, false, false]);
  const introSeen = progress.introDismissed?.includes('urban-canvas');

  const togglePanel = (index) => {
    setAligned((current) => {
      const next = [...current];
      next[index] = !next[index];
      if (next.every(Boolean)) markPuzzleSolved('urban-canvas');
      return next;
    });
  };

  return (
    <group>
      {!introSeen ? (
        <Html center>
          <div className="intro-card">
            <p className="eyebrow">Urban Canvas</p>
            <h3>Align all three neon graffiti panels to reveal the story layer.</h3>
            <button type="button" className="primary-button" onClick={() => dismissIntro('urban-canvas')}>Enter</button>
          </div>
        </Html>
      ) : null}
      <GallerySpace tint="#120c18" particleColor="#ff4dd6" />
      {[-4, 0, 4].map((x, index) => (
        <mesh key={x} position={[x, 2.2, -4.1]} rotation={[0, 0, aligned[index] ? 0 : 0.14]} onClick={() => togglePanel(index)}>
          <planeGeometry args={[2.1, 2.8]} />
          <meshStandardMaterial color={index % 2 === 0 ? '#ff4dd6' : '#5ae7ff'} emissive={index % 2 === 0 ? '#ff4dd6' : '#5ae7ff'} emissiveIntensity={0.42} />
        </mesh>
      ))}
      <mesh position={[-5.2, 3.2, -2.2]}><boxGeometry args={[1.2, 4.5, 1.2]} /><meshStandardMaterial color="#1f2336" /></mesh>
      <mesh position={[5.2, 2.4, -1.7]}><boxGeometry args={[1.4, 3.1, 1.4]} /><meshStandardMaterial color="#22293d" /></mesh>
      <TShirtModel product={products[3]} position={[0, 1.55, 0.4]} scale={1.1} />
      <Html position={[0, 3.8, 0]}><button type="button" className="ghost-button" onClick={() => setAligned([false, false, false])}>Reset puzzle</button></Html>
      <PortalGate label="Return to Gallery" slug="return" position={[0, 2.2, -5.6]} onEnter={() => navigate(ROUTES.home)} />
    </group>
  );
}
