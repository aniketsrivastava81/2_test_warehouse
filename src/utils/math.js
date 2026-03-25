import * as THREE from 'three';

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
export const vec3FromArray = (arr) => new THREE.Vector3(arr[0], arr[1], arr[2]);
