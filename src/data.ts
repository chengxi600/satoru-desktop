import * as THREE from 'three';

export type ShapeName = "Malevolent Shrine" | "Infinite Void" | "Purple" | "Red" | "Blue" | "Neutral";

export class PointCloudShape {
  name: ShapeName;
  verticies: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  shakeIntensity: number;
  bloomPassStrength: number;
  rotationDelta: THREE.Euler;

  constructor(vertexCount: number) {
    this.name = "Neutral";
    this.verticies = new Float32Array(vertexCount * 3);
    this.colors = new Float32Array(vertexCount * 3);;
    this.sizes = new Float32Array(vertexCount);;
    this.shakeIntensity = 0;
    this.bloomPassStrength = 0;
    this.rotationDelta = new THREE.Euler(0, 0, 0);
  }
}
