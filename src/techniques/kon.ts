import { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { Anime, COUNT, Technique, TechniqueName, createShape, createTechnique } from "./base";

export function getKon(vertexCount: number): Technique {
  const eye = createShape(vertexCount);

  const totalRings = 12;
  const ringStart = 0.2;
  const ringEnd = 1.3;
  const ringSpacing = (ringEnd - ringStart) / totalRings;
  const ringHeightScale = 0.6
  const ringWidthScale = 1.1

  const geometryScale = 50;
  const ringSize = 15;       // size of yellow ring points
  const backgroundSize = 8;  // size of red background points

  let vertexIndex = 0;

  // --- Generate rings ---
  for (let j = 0; j < totalRings; j++) {
    const r = ringStart + j * ringSpacing;
    const pointsPerRing = Math.floor(vertexCount * 0.05); // 5% per ring

    for (let i = 0; i < pointsPerRing && vertexIndex < vertexCount; i++, vertexIndex++) {
      const theta = Math.random() * Math.PI * 2;
      let x = r * Math.cos(theta) * ringWidthScale;
      let y = r * Math.sin(theta) * ringHeightScale;

      // Almond taper
      const factor = 1 - Math.pow(Math.abs(x) / 1.6, 2);
      y *= factor;

      const z = (Math.random() - 0.5) * 0.02;

      // --- Apply global scale ---
      const i3 = vertexIndex * 3;
      eye.verticies[i3] = x * geometryScale;
      eye.verticies[i3 + 1] = y * geometryScale;
      eye.verticies[i3 + 2] = z * geometryScale;

      // Colors
      eye.colors[i3] = 1.0;
      eye.colors[i3 + 1] = 1.0;
      eye.colors[i3 + 2] = 0.0;

      // Size
      eye.sizes[vertexIndex] = ringSize;
    }
  }

  // --- Fill the rest with red background points ---
  while (vertexIndex < vertexCount) {
    const radius = Math.random() * (ringEnd - 0.02);
    const theta = Math.random() * Math.PI * 2;

    let x = radius * Math.cos(theta) * ringWidthScale;
    let y = radius * Math.sin(theta) * ringHeightScale;

    const factor = 1 - Math.pow(Math.abs(x) / 1.6, 2);
    y *= factor;

    const z = (Math.random() - 0.5) * 0.05;

    const i3 = vertexIndex * 3;
    eye.verticies[i3] = x * geometryScale;
    eye.verticies[i3 + 1] = y * geometryScale;
    eye.verticies[i3 + 2] = z * geometryScale;

    eye.colors[i3] = 1.0;
    eye.colors[i3 + 1] = 0.0;
    eye.colors[i3 + 2] = 0.0;

    eye.sizes[vertexIndex] = backgroundSize;
    vertexIndex++;
  }

  // --- Optional animation parameters ---
  eye.shakeIntensity = 0.05;
  eye.bloomPassStrength = 0.5;
  eye.rotationDelta.set(0, 0, 0);

  return createTechnique(TechniqueName.Kon, Anime.CSM, eye, "/audio/kon.mp3");
}

export function is_kon(results: HandLandmarkerResult): boolean {
  // only one hand
  if (results.handedness.length !== 1) {
    return false;
  }

  const landmarks = results.landmarks[0];

  const ears = [8, 20];
  const fox = [4, 12, 16];
  const wrist = 0;

  const isAbove = (i: number, j: number) => landmarks[i].y < landmarks[j].y;
  const isRightOf = (i: number, j: number) => landmarks[i].x < landmarks[j].x;

  const earsRightOfFox = ears.every(earIndex => fox.every(foxIndex => isRightOf(earIndex, foxIndex)));
  const earsAboveFox = ears.every(earIndex => fox.every(foxIndex => isAbove(earIndex, foxIndex)));
  const wristRightOfAll = [...ears, ...fox].every(i => isRightOf(wrist, i));

  return earsAboveFox && earsRightOfFox && wristRightOfAll;
}

export const kon = getKon(COUNT);
