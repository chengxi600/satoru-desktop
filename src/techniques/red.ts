import { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { Anime, COUNT, createShape, createTechnique, Technique, TechniqueName } from "./base";

function getRed(vertexCount: number): Technique {
  const red = createShape(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    let x: number, y: number, z: number, r: number, g: number, b: number, s: number;

    if (i < vertexCount * 0.1) {
      const radius = Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);

      r = 3; g = 0.1; b = 0.1;
      s = 2.5;
    } else {
      const armCount = 3;
      const t = i / vertexCount;
      const angle = t * 15 + ((i % armCount) * (Math.PI * 2 / armCount));
      const radius = 2 + (t * 40);

      x = radius * Math.cos(angle);
      y = radius * Math.sin(angle);
      z = (Math.random() - 0.5) * (10 * t);

      r = 0.8; g = 0; b = 0;
      s = 1.0;
    }

    const i3 = i * 3;
    red.verticies[i3] = x;
    red.verticies[i3 + 1] = y;
    red.verticies[i3 + 2] = z;
    red.colors[i3] = r;
    red.colors[i3 + 1] = g;
    red.colors[i3 + 2] = b;
    red.sizes[i] = s;
  }

  red.shakeIntensity = 0.4;
  red.bloomPassStrength = 2.5;
  red.rotationDelta.set(0, 0, -0.1);

  return createTechnique(TechniqueName.Red, Anime.JJK, red, "/audio/red.mp3");
}

export function is_red(results: HandLandmarkerResult): boolean {
  // only one hand
  if (results.handedness.length !== 1) {
    return false;
  }

  const landmarks = results.landmarks[0];

  const fingertipIndices = [12, 16, 20]; // middle, ring, pinky
  const thumb = 4;
  const indexTip = 8;

  const isAbove = (i: number, j: number) => landmarks[i].y < landmarks[j].y;
  const isRightOf = (i: number, j: number) => landmarks[i].x < landmarks[j].x;

  const indexAboveAllFingers = [thumb, ...fingertipIndices].every(i => isAbove(indexTip, i));

  const allFingersRightOfIndex = [thumb, ...fingertipIndices].every(i => isRightOf(i, indexTip));

  return indexAboveAllFingers && allFingersRightOfIndex;
}

export const red = getRed(COUNT);