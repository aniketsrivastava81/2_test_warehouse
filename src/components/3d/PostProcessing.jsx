import PropTypes from 'prop-types';
import { useMemo } from 'react';

export default function PostProcessing({ sceneKey }) {
  const overlay = useMemo(() => {
    if (sceneKey === 'cloud') return { color: '#ffffff', opacity: 0.03 };
    if (sceneKey === 'vault') return { color: '#7d8cff', opacity: 0.035 };
    return { color: '#f5e9d7', opacity: 0.015 };
  }, [sceneKey]);

  return (
    <group name="post-processing-pass">
      <mesh position={[0, 0, -12]}>
        <planeGeometry args={[40, 24]} />
        <meshBasicMaterial color={overlay.color} transparent opacity={overlay.opacity} depthWrite={false} />
      </mesh>
    </group>
  );
}

PostProcessing.propTypes = {
  sceneKey: PropTypes.string.isRequired,
};
