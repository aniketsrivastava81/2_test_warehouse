export const fabricRippleShader = {
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uStrength;
    void main() {
      vUv = uv;
      vec3 transformed = position;
      transformed.z += sin((position.y * 6.0) + uTime * 1.5) * uStrength;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(vec3(1.0), 1.0);
    }
  `,
};
