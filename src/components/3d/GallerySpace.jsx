import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { featureFlags } from '../../config/features';

export default function GallerySpace({ tint = '#0d1018', particleColor = '#ffffff' }) {
  const particles = useMemo(() => Array.from({ length: featureFlags.reducedParticles ? 16 : 32 }, (_, index) => ({
    x: -5 + index * 0.3,
    y: 0.18 + (index % 3) * 0.05,
    z: 2.8 - index * 0.19,
  })), []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color={tint} roughness={0.92} />
      </mesh>
      <mesh position={[0, 3.8, -6.8]}>
        <boxGeometry args={[14, 7, 0.25]} />
        <meshStandardMaterial color="#0b0d15" roughness={1} />
      </mesh>
      <mesh position={[-7.05, 3.4, 0]}>
        <boxGeometry args={[0.25, 6.5, 14]} />
        <meshStandardMaterial color="#111625" roughness={1} />
      </mesh>
      <mesh position={[7.05, 3.4, 0]}>
        <boxGeometry args={[0.25, 6.5, 14]} />
        <meshStandardMaterial color="#111625" roughness={1} />
      </mesh>
      <mesh position={[0, 6.6, 0]}>
        <boxGeometry args={[14, 0.2, 14]} />
        <meshStandardMaterial color="#171d30" roughness={1} />
      </mesh>
      {particles.map((particle, index) => (
        <mesh key={index} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[0.05 + (index % 2) * 0.02, 8, 8]} />
          <meshStandardMaterial color={particleColor} emissive={particleColor} emissiveIntensity={1.1} />
        </mesh>
      ))}
    </group>
  );
}

GallerySpace.propTypes = {
  tint: PropTypes.string,
  particleColor: PropTypes.string,
};
