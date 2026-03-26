export const clothTearShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: `
    varying vec2 vUv;
    void main() {
      float edge = smoothstep(0.48, 0.52, abs(vUv.x - 0.5));
      gl_FragColor = vec4(vec3(0.05), 1.0 - edge);
    }
  `,
};
