export const cloudVolumeShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: `
    varying vec2 vUv;
    void main() {
      float alpha = smoothstep(0.8, 0.2, distance(vUv, vec2(0.5)));
      gl_FragColor = vec4(vec3(1.0), alpha * 0.25);
    }
  `,
};
