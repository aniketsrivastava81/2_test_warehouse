import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function SensoryVoidScene() {
  const threadRef = useRef(null);
  const clothLeft = useRef(null);
  const clothRight = useRef(null);

  useFrame(({ clock }) => {
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 2.4) * 0.08;
    if (threadRef.current) threadRef.current.scale.y = pulse;
    if (clothLeft.current) clothLeft.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.6) * 0.08;
    if (clothRight.current) clothRight.current.rotation.z = -Math.sin(clock.getElapsedTime() * 0.6) * 0.08;
  });

  return (
    <group>
      <mesh ref={threadRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 3.6, 18]} />
        <meshStandardMaterial color="#e8dcc9" emissive="#e8dcc9" emissiveIntensity={0.75} />
      </mesh>
      <mesh ref={clothLeft} position={[-1.8, 0, -0.4]} rotation={[0.1, 0.12, 0.18]}>
        <planeGeometry args={[2.4, 3.4, 24, 24]} />
        <meshStandardMaterial color="#0e121c" roughness={1} side={2} />
      </mesh>
      <mesh ref={clothRight} position={[1.8, 0, -0.4]} rotation={[0.1, -0.12, -0.18]}>
        <planeGeometry args={[2.4, 3.4, 24, 24]} />
        <meshStandardMaterial color="#0e121c" roughness={1} side={2} />
      </mesh>
    </group>
  );
}
