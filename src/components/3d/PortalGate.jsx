import PropTypes from 'prop-types';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const colors = {
  'organic-oasis': '#9be37a',
  'urban-canvas': '#ff4dd6',
  'abstract-dreamscape': '#9d7dff',
  return: '#ffffff',
};

export default function PortalGate({ label, slug, position, onEnter }) {
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const color = colors[slug] || '#ffffff';

  useFrame(({ clock }) => {
    if (!ringRef.current || !glowRef.current) return;
    ringRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    glowRef.current.material.opacity = 0.25 + (Math.sin(clock.getElapsedTime() * 1.5) + 1) * 0.08;
  });

  return (
    <group position={position} onClick={() => onEnter(slug)}>
      <mesh ref={ringRef} castShadow>
        <torusGeometry args={[1.1, 0.18, 24, 80]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} metalness={0.2} roughness={0.2} />
      </mesh>
      <mesh ref={glowRef}>
        <circleGeometry args={[0.85, 48]} />
        <meshStandardMaterial color={color} transparent opacity={0.24} />
      </mesh>
      <Text position={[0, -1.8, 0]} fontSize={0.23} color={color} anchorX="center">{label}</Text>
    </group>
  );
}

PortalGate.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  onEnter: PropTypes.func.isRequired,
};
