import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useExperience } from '../../context/ExperienceContext';
import { usePhysics } from '../../hooks/usePhysics';
import { getFallbackMaterial } from '../../utils/modelLoader';

function ShirtSilhouette({ primary, accent, ripple }) {
  const bodyRef = useRef(null);
  const hemRef = useRef(null);

  useFrame(({ clock }) => {
    if (!bodyRef.current || !hemRef.current) return;
    hemRef.current.scale.y = 1 + Math.sin(clock.getElapsedTime() * 2.4) * ripple;
    bodyRef.current.material.roughness = 0.68;
  });

  return (
    <group>
      <mesh ref={bodyRef} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.45, 1.9, 0.22]} />
        <meshStandardMaterial color={primary} roughness={0.7} metalness={0.08} />
      </mesh>
      <mesh position={[-0.96, 0.45, 0]} rotation={[0, 0, 0.48]} castShadow>
        <boxGeometry args={[0.62, 0.52, 0.18]} />
        <meshStandardMaterial color={primary} roughness={0.7} metalness={0.08} />
      </mesh>
      <mesh position={[0.96, 0.45, 0]} rotation={[0, 0, -0.48]} castShadow>
        <boxGeometry args={[0.62, 0.52, 0.18]} />
        <meshStandardMaterial color={primary} roughness={0.7} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.86, 0.12]}>
        <torusGeometry args={[0.26, 0.08, 16, 40, Math.PI]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.16} />
      </mesh>
      <mesh position={[0, 0.14, 0.15]}>
        <planeGeometry args={[0.85, 0.85]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.22} transparent opacity={0.26} />
      </mesh>
      <mesh ref={hemRef} position={[0, -0.88, 0.11]}>
        <planeGeometry args={[1.18, 0.2]} />
        <meshStandardMaterial color={accent} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export default function TShirtModel({ product, position, rotation = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef(null);
  const accentLightRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const { setSelectedProductId, gravityMode, unlockedProducts, playSoftPulse } = useExperience();
  const physics = usePhysics(gravityMode);

  const material = useMemo(() => getFallbackMaterial(product), [product]);
  const locked = product.vaultLocked && !unlockedProducts[product.id];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    if (!physics.isPaused) {
      groupRef.current.position.y = position[1] + Math.sin(t * physics.swaySpeed + position[0]) * physics.floatHeight;
      groupRef.current.rotation.z = rotation[2] + Math.sin(t * physics.swaySpeed + position[2]) * physics.swayAmplitude;
    }
    const distance = camera.position.distanceTo(groupRef.current.position);
    const targetIntensity = distance < 5 ? 1.6 : hovered ? 1 : 0.5;
    if (accentLightRef.current) {
      accentLightRef.current.intensity = THREE.MathUtils.lerp(accentLightRef.current.intensity, targetIntensity, 0.12);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(event) => {
        event.stopPropagation();
        setSelectedProductId(product.id);
        playSoftPulse(locked ? 180 : 260);
      }}
    >
      <mesh position={[0, 0, -0.12]} renderOrder={1}>
        <boxGeometry args={[1.95, 2.48, 0.12]} />
        <meshStandardMaterial color={hovered ? '#f8f4ee' : '#202431'} transparent opacity={0.08} />
      </mesh>
      <mesh visible={false}>
        <boxGeometry args={[1.95, 2.48, 1.1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <ShirtSilhouette primary={material.color} accent={material.accent} ripple={physics.rippleStrength} />
      <pointLight ref={accentLightRef} position={[0, 1, 1.1]} distance={4.2} color={material.accent} intensity={0.5} />
      {locked ? (
        <mesh position={[0, 0.1, 0.3]}>
          <circleGeometry args={[0.28, 24]} />
          <meshStandardMaterial color="#ffd977" emissive="#ffd977" emissiveIntensity={0.5} />
        </mesh>
      ) : null}
      <Text position={[0, -1.45, 0.2]} fontSize={0.2} color={hovered ? '#ffffff' : '#aab1c8'} anchorX="center">{product.name}</Text>
    </group>
  );
}

TShirtModel.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    accentColor: PropTypes.string,
    vaultLocked: PropTypes.bool,
  }).isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  rotation: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.number,
};
