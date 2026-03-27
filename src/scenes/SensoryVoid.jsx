import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import ClothTear from '../components/shaders/ClothTear';
import { entryThreadPhysics } from '../config/physics';
import { useExperience } from '../context/ExperienceContext';

export default function SensoryVoidScene() {
  const { mouse } = useThree();
  const { beginEntryReveal, entryReveal } = useExperience();
  const groupRef = useRef(null);
  const threadPoints = useMemo(
    () => Array.from({ length: entryThreadPhysics.segmentCount }, (_, index) => new THREE.Vector3(0, 1.5 - index * entryThreadPhysics.segmentDistance, 0)),
    [],
  );
  const trailGeometryRef = useRef(new THREE.BufferGeometry().setFromPoints(threadPoints));
  const haloRef = useRef(null);
  const leftClothRef = useRef(null);
  const rightClothRef = useRef(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const lead = new THREE.Vector3(mouse.x * 1.8, mouse.y * 2.4, 0);
    lead.x += Math.sin(elapsed * 0.55) * 0.05;
    lead.y += Math.cos(elapsed * 0.45) * 0.06;

    threadPoints[0].lerp(lead, entryThreadPhysics.followLerp);
    for (let index = 1; index < threadPoints.length; index += 1) {
      const previousPoint = threadPoints[index - 1];
      const currentPoint = threadPoints[index];
      const direction = previousPoint.clone().sub(currentPoint);
      const distance = direction.length() || 0.0001;
      direction.normalize().multiplyScalar(distance - entryThreadPhysics.segmentDistance);
      currentPoint.add(direction.multiplyScalar(0.38));
      currentPoint.lerp(new THREE.Vector3(currentPoint.x, previousPoint.y - entryThreadPhysics.segmentDistance, 0), 0.06);
    }

    trailGeometryRef.current.setFromPoints(threadPoints);
    trailGeometryRef.current.attributes.position.needsUpdate = true;

    if (haloRef.current) {
      const pulse = 1 + Math.sin(elapsed * entryThreadPhysics.pulseSpeed) * 0.12;
      haloRef.current.scale.setScalar(pulse);
      haloRef.current.material.opacity = 0.26 + Math.sin(elapsed * 2.1) * 0.04;
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(elapsed * 0.4) * 0.04;
    }

    if (leftClothRef.current && rightClothRef.current) {
      const revealOffset = entryReveal.active ? entryReveal.progress * 2.3 : 0;
      leftClothRef.current.position.x = -1.8 - revealOffset;
      rightClothRef.current.position.x = 1.8 + revealOffset;
      leftClothRef.current.rotation.z = 0.12 + revealOffset * 0.08;
      rightClothRef.current.rotation.z = -0.12 - revealOffset * 0.08;
    }
  });

  const handleReveal = (event) => {
    event.stopPropagation();
    beginEntryReveal({ x: event.uv?.x ?? 0.5, y: event.uv?.y ?? 0.5 });
  };

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -1.8]}>
        <planeGeometry args={[16, 12]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <mesh ref={leftClothRef} position={[-1.8, 0, -0.2]} rotation={[0.04, 0.05, 0.12]} onClick={handleReveal}>
        <planeGeometry args={[2.8, 4.6, 40, 40]} />
        <meshStandardMaterial color="#07090f" roughness={1} metalness={0.02} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={rightClothRef} position={[1.8, 0, -0.2]} rotation={[0.04, -0.05, -0.12]} onClick={handleReveal}>
        <planeGeometry args={[2.8, 4.6, 40, 40]} />
        <meshStandardMaterial color="#07090f" roughness={1} metalness={0.02} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={haloRef} position={[0, 0.4, -0.05]} renderOrder={4}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28} depthWrite={false} />
      </mesh>

      <mesh position={threadPoints[0]} renderOrder={5} onClick={handleReveal}>
        <sphereGeometry args={[0.08, 18, 18]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
      </mesh>

      <line geometry={trailGeometryRef.current} onClick={handleReveal}>
        <lineBasicMaterial color="#ffffff" linewidth={2} transparent opacity={0.95} />
      </line>

      <ClothTear active={entryReveal.active} origin={entryReveal.origin} progress={entryReveal.progress} />
    </group>
  );
}
