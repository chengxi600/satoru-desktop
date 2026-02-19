import { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { Anime, COUNT, Technique, TechniqueName, createShape, createTechnique } from "./base";

function getPurple(vertexCount: number): Technique {
  const purple = createShape(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    let x: number, y: number, z: number, r: number, g: number, b: number, s: number;

    if (Math.random() > 0.8) {
      x = (Math.random() - 0.5) * 100;
      y = (Math.random() - 0.5) * 100;
      z = (Math.random() - 0.5) * 100;
      r = 0.5; g = 0.5; b = 0.7;
      s = 0.8;
    } else {
      const radius = 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);

      r = 0.6; g = 0.5; b = 1.0;
      s = 2.5;
    }

    const i3 = i * 3;
    purple.verticies[i3] = x;
    purple.verticies[i3 + 1] = y;
    purple.verticies[i3 + 2] = z;
    purple.colors[i3] = r;
    purple.colors[i3 + 1] = g;
    purple.colors[i3 + 2] = b;
    purple.sizes[i] = s;
  }

  purple.shakeIntensity = 0.4;
  purple.bloomPassStrength = 4.0;
  purple.rotationDelta.set(0, 0.05, 0.2);

  return createTechnique(TechniqueName.Purple, Anime.JJK, purple, "/audio/purple.mp3");
}

export function is_purple(results: HandLandmarkerResult): boolean {
  if (results.handedness.length !== 1) return false;

  const landmarks = results.landmarks[0];
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];

  // Distance between thumb and index
  const dx = thumbTip.x - indexTip.x;
  const dy = thumbTip.y - indexTip.y;
  const dz = thumbTip.z - indexTip.z;
  const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

  // Optional: check if middle, ring, pinky are somewhat extended
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  const fingersExtended = 
    middleTip.y < landmarks[0].y && // above wrist
    ringTip.y < landmarks[0].y &&
    pinkyTip.y < landmarks[0].y;

  // Threshold for pinch (tune between 0.03-0.08 depending on normalized coords)
  const PINCH_THRESHOLD = 0.05;

  return distance < PINCH_THRESHOLD && fingersExtended;
}

export const purple = getPurple(COUNT);