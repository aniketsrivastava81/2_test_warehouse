import PropTypes from 'prop-types';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function VaultDoor({ onEnter }) {
  const materialRef = useRef(null);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.emissiveIntensity = 0.22 + (Math.sin(clock.getElapsedTime() * 1.2) + 1) * 0.12;
  });

  return (
    <group position={[0, 2.2, -5.7]} onClick={onEnter}>
      <mesh castShadow>
        <boxGeometry args={[2.4, 4.2, 0.28]} />
        <meshStandardMaterial ref={materialRef} color="#1a2136" emissive="#6f8bff" emissiveIntensity={0.3} metalness={0.65} roughness={0.18} />
      </mesh>
      <Text position={[0, -2.7, 0.2]} fontSize={0.24} color="#ced7ff" anchorX="center">Esclusivo & Rare</Text>
    </group>
  );
}

VaultDoor.propTypes = {
  onEnter: PropTypes.func.isRequired,
};
