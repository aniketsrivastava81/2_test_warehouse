export const glassDissolveShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: `
    varying vec2 vUv;
    void main() {
      float mask = smoothstep(0.2, 0.8, vUv.y);
      gl_FragColor = vec4(vec3(0.7, 0.8, 1.0), mask * 0.35);
    }
  `,
};
