import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { products } from '../config/products';
import { ROUTES } from '../config/routes';
import { useExperience } from '../context/ExperienceContext';
import TShirtModel from '../components/3d/TShirtModel';
import PortalGate from '../components/3d/PortalGate';

function Ripple({ origin, age }) {
  return (
    <mesh position={origin} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.2 + age * 0.2, 0.24 + age * 0.2, 48]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={Math.max(0.5 - age * 0.2, 0)} />
    </mesh>
  );
}

export default function CottonCloud() {
  const navigate = useNavigate();
  const { camera, pointer } = useThree();
  const { selectedProduct } = useExperience();
  const product = selectedProduct || products[0];
  const [ripples, setRipples] = useState([]);
  const cloudRefs = useRef([]);

  const cloudPositions = useMemo(() => [
    [-4.5, 1.5, -2],
    [-2.8, 3.2, -1.6],
    [2.8, 2.6, -1.8],
    [4.4, 1.8, -1.2],
    [0.6, 3.4, -2.4],
  ], []);

  const whisperVisible = camera.position.distanceTo(new THREE.Vector3(0, 1.45, 0)) < 6;

  useFrame((state, delta) => {
    cloudRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      mesh.position.x += (pointer.x * 0.012 * (index + 1)) * (delta * 60);
      mesh.position.z += (-pointer.x * 0.008) * (delta * 60);
      mesh.position.y += Math.sin(state.clock.getElapsedTime() * 0.4 + index) * 0.002;
    });
    setRipples((current) => current.map((ripple) => ({ ...ripple, age: ripple.age + delta * 2 })).filter((ripple) => ripple.age < 2.5));
  });

  return (
    <group>
      {cloudPositions.map((position, index) => (
        <mesh key={index} ref={(element) => { cloudRefs.current[index] = element; }} position={position}>
          <sphereGeometry args={[1.5 + index * 0.12, 28, 28]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.18} roughness={1} />
        </mesh>
      ))}
      <group onClick={(event) => {
        event.stopPropagation();
        setRipples((current) => [...current, { origin: [0, 0.2, 1.1], age: 0 }]);
      }}>
        <TShirtModel product={product} position={[0, 1.45, 0]} scale={1.25} />
      </group>
      {whisperVisible ? (
        <group position={[0, 3, -0.4]}>
          <Text position={[0, 0.6, 0]} fontSize={0.24} color="#2a3652">180 Thread Count</Text>
          <Text position={[0, 0.25, 0]} fontSize={0.2} color="#2a3652">100% Premium Egyptian Cotton</Text>
          <Text position={[0, -0.1, 0]} fontSize={0.18} color="#2a3652">Ethically Sourced</Text>
        </group>
      ) : null}
      {ripples.map((ripple, index) => <Ripple key={index} origin={ripple.origin} age={ripple.age} />)}
      <PortalGate label="Return to Gallery" slug="return" position={[0, 1.7, -4.9]} onEnter={() => navigate(ROUTES.home)} />
    </group>
  );
}
