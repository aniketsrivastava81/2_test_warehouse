import { Html } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { products } from '../config/products';
import { ROUTES } from '../config/routes';
import TShirtModel from '../components/3d/TShirtModel';
import PortalGate from '../components/3d/PortalGate';
import { useExperience } from '../context/ExperienceContext';

function FloatingShape({ position, color, onSolvePart }) {
  const [clicked, setClicked] = useState(false);
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.4;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.55;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => {
        if (!clicked) {
          setClicked(true);
          onSolvePart();
        }
      }}
    >
      <torusKnotGeometry args={[0.5, 0.16, 96, 16]} />
      <meshStandardMaterial color={clicked ? '#ffe783' : color} emissive={clicked ? '#ffe783' : color} emissiveIntensity={0.4} />
    </mesh>
  );
}

export default function AbstractDreamscape() {
  const navigate = useNavigate();
  const { markPuzzleSolved, progress, dismissIntro } = useExperience();
  const [solvedParts, setSolvedParts] = useState(0);
  const introSeen = progress.introDismissed?.includes('abstract-dreamscape');

  const handleSolvePart = () => {
    setSolvedParts((current) => {
      const next = current + 1;
      if (next >= 3) markPuzzleSolved('abstract-dreamscape');
      return next;
    });
  };

  return (
    <group>
      {!introSeen ? (
        <Html center>
          <div className="intro-card">
            <p className="eyebrow">Abstract Dreamscape</p>
            <h3>Rotate and collect all three forms to complete the pattern.</h3>
            <button type="button" className="primary-button" onClick={() => dismissIntro('abstract-dreamscape')}>Enter</button>
          </div>
        </Html>
      ) : null}
      <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[35, 35]} /><meshStandardMaterial color="#180c24" /></mesh>
      <FloatingShape position={[-3.3, 2.4, -1.2]} color="#9d7dff" onSolvePart={handleSolvePart} />
      <FloatingShape position={[0, 3, 0]} color="#ff63ce" onSolvePart={handleSolvePart} />
      <FloatingShape position={[3.2, 2.5, -1.5]} color="#6fe5ff" onSolvePart={handleSolvePart} />
      <TShirtModel product={products[0]} position={[0, 1.4, 1.8]} scale={1.15} />
      <Html position={[0, 3.8, 0]}><button type="button" className="ghost-button" onClick={() => setSolvedParts(0)}>Reset puzzle</button></Html>
      <PortalGate label="Return to Gallery" slug="return" position={[0, 1.9, -5.4]} onEnter={() => navigate(ROUTES.home)} />
    </group>
  );
}
