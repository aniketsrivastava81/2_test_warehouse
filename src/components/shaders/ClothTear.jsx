import { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform vec2 uOrigin;
  uniform float uProgress;
  uniform float uOpacity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 centered = vUv - uOrigin;
    float distanceToOrigin = length(centered);
    float organicEdge = noise(vUv * 18.0 + uProgress * 3.0) * 0.08;
    float radius = mix(0.02, 1.05, clamp(uProgress, 0.0, 1.0));
    float hole = smoothstep(radius + organicEdge, radius - 0.15 + organicEdge, distanceToOrigin);
    float clothShade = 0.03 + noise(vUv * 24.0) * 0.035;
    float alpha = hole * uOpacity;

    if (alpha <= 0.001) {
      discard;
    }

    gl_FragColor = vec4(vec3(clothShade), alpha);
  }
`;

export default function ClothTear({ active, origin, progress }) {
  const materialRef = useRef(null);

  const uniforms = useMemo(() => ({
    uOrigin: { value: new THREE.Vector2(origin.x, origin.y) },
    uProgress: { value: progress },
    uOpacity: { value: active ? 1 : 0 },
  }), [active, origin.x, origin.y, progress]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uOrigin.value.set(origin.x, origin.y);
    materialRef.current.uniforms.uProgress.value = progress;
    materialRef.current.uniforms.uOpacity.value = active ? 1 : 0;
  }, [active, origin.x, origin.y, progress]);

  return (
    <mesh position={[0, 0, 0.8]} renderOrder={10}>
      <planeGeometry args={[11, 11, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

ClothTear.propTypes = {
  active: PropTypes.bool.isRequired,
  origin: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  progress: PropTypes.number.isRequired,
};
