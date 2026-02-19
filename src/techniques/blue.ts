import { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { Anime, COUNT, createShape, createTechnique, Technique, TechniqueName } from "./base";

function getBlue(vertexCount: number): Technique {
  const blue = createShape(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    let x: number, y: number, z: number, r: number, g: number, b: number, s: number;

    if (i < vertexCount * 0.3) {
      const radius = Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);

      r = 0.3; g = 0.4; b = 1.0;
      s = 2.5;
    } else {
      const radius = 12 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);

      r = 0.2 + Math.random() * 0.1;
      g = 0.3 + Math.random() * 0.1;
      b = 0.8 + Math.random() * 0.2;
      s = 0.5 + Math.random();
    }

    const i3 = i * 3;
    blue.verticies[i3] = x;
    blue.verticies[i3 + 1] = y;
    blue.verticies[i3 + 2] = z;
    blue.colors[i3] = r;
    blue.colors[i3 + 1] = g;
    blue.colors[i3 + 2] = b;
    blue.sizes[i] = s;
  }

  blue.shakeIntensity = 0.2;
  blue.bloomPassStrength = 1.5;
  blue.rotationDelta.set(0, 0, 0.1);

  return createTechnique(TechniqueName.Blue, Anime.JJK, blue, "/audio/blue.mp3");
}

export function is_blue(results: HandLandmarkerResult): boolean {
  // only one hand
  if (results.handedness.length !== 1) {
    return false;
  }

  const landmarks = results.landmarks[0];

  const fingertipIndices = [12, 16, 20]; // middle, ring, pinky
  const thumb = 4;
  const indexTip = 8;

  const isAbove = (i: number, j: number) => landmarks[i].y < landmarks[j].y;
  const isLeftOf = (i: number, j: number) => landmarks[i].x > landmarks[j].x;

  const indexAboveAllFingers = [thumb, ...fingertipIndices].every(i => isAbove(indexTip, i));

  const allFingersRightOfIndex = [thumb, ...fingertipIndices].every(i => isLeftOf(i, indexTip));

  return indexAboveAllFingers && allFingersRightOfIndex;
}

export const blue = getBlue(COUNT);