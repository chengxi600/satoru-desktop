import * as THREE from "three";

export type TechniqueName = "Malevolent Shrine" | "Infinite Void" | "Purple" | "Red" | "Blue" | "Neutral";

export const COUNT = 20000;

export interface PointCloudShape {
  verticies: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  shakeIntensity: number;
  bloomPassStrength: number;
  rotationDelta: THREE.Euler;
}

export interface Technique {
  name: TechniqueName;
  geometry: PointCloudShape;
  audio: HTMLAudioElement;
}

export const neutral: Technique = {
  name: "Neutral",
  audio: new Audio(),
  geometry: {
    verticies: new Float32Array(COUNT * 3),
    colors: new Float32Array(COUNT * 3),
    sizes: new Float32Array(COUNT),
    shakeIntensity: 0,
    bloomPassStrength: 0,
    rotationDelta: new THREE.Euler(0, 0, 0),
  }
}

export function createShape(vertexCount: number): PointCloudShape {
  return {
    verticies: new Float32Array(vertexCount * 3),
    colors: new Float32Array(vertexCount * 3),
    sizes: new Float32Array(vertexCount),
    shakeIntensity: 0,
    bloomPassStrength: 1,
    rotationDelta: new THREE.Euler()
  };
}

export function createTechnique(
  name: TechniqueName,
  geometry: PointCloudShape,
  audioSrc?: string
): Technique {
  const audio = new Audio(audioSrc);
  audio.loop = true;

  return {
    name,
    geometry,
    audio
  };
}
