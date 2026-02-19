import { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { Anime, COUNT, Technique, TechniqueName, createShape, createTechnique } from "./base";

export function getReze(vertexCount: number): Technique {
  const explosion = createShape(vertexCount);

  let vertexIndex = 0;

  const coreRatio = 0.9; 
  const coreCount = Math.floor(vertexCount * coreRatio);
  const sparkCount = vertexCount - coreCount;

  const coreRadius = 50; 
  const sparkRadiusMin = 40;
  const sparkRadiusMax = 120;

  // --- Central orange/yellow glowing core ---
  for (let i = 0; i < coreCount; i++, vertexIndex++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.random() * coreRadius;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    const i3 = vertexIndex * 3;
    explosion.verticies[i3] = x;
    explosion.verticies[i3 + 1] = y;
    explosion.verticies[i3 + 2] = z;

    // Orange/yellow gradient
    explosion.colors[i3] = 1.0;                        // red/orange
    explosion.colors[i3 + 1] = 0.5 + Math.random() * 0.3; // yellowish variation
    explosion.colors[i3 + 2] = 0.0;                     // no blue

    explosion.sizes[vertexIndex] = 8.0 + Math.random() * 2.0; // slightly bigger points
  }

  // --- Sparks as outer cosmic sphere ---
  for (let i = 0; i < sparkCount && vertexIndex < vertexCount; i++, vertexIndex++) {
    const radius = sparkRadiusMin + Math.random() * (sparkRadiusMax - sparkRadiusMin);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    const i3 = vertexIndex * 3;
    explosion.verticies[i3] = x;
    explosion.verticies[i3 + 1] = y;
    explosion.verticies[i3 + 2] = z;

    // Sparks: orange to yellow
    explosion.colors[i3] = 1.0;                        // red/orange
    explosion.colors[i3 + 1] = 0.6 + Math.random() * 0.3; // yellowish variation
    explosion.colors[i3 + 2] = 0.0;

    explosion.sizes[vertexIndex] = 2.0 + Math.random() * 1.5; // smaller spark points
  }

  // --- Visual / animation parameters ---
  explosion.shakeIntensity = 0.25;           // slightly stronger shake
  explosion.bloomPassStrength = 4.0;        // stronger glow
  explosion.rotationDelta.set(
    (Math.random() - 0.5) * 0.05,
    (Math.random() - 0.5) * 0.05,
    (Math.random() - 0.5) * 0.05
  );

  return createTechnique(TechniqueName.Reze, Anime.CSM, explosion, "/audio/reze.mp3");
}

export function is_reze(results: HandLandmarkerResult): boolean {
    // only one hand
  if (results.handedness.length !== 1) {
    return false;
  }

  const landmarks = results.landmarks[0];

  const pullingFingers = [8, 12]; // middle, index
  const otherFingers = [4, 16, 20];
  const wrist = 0;

  const isAbove = (i: number, j: number) => landmarks[i].y < landmarks[j].y;
  const isLeftOf = (i: number, j: number) => landmarks[i].x > landmarks[j].x;

  const pullingFingersLeftOfRest = pullingFingers.every(pullingIdx => otherFingers.every(restIdx => isLeftOf(pullingIdx, restIdx)));
  const pullingFingersLeftOfWrist = pullingFingers.every(i => isLeftOf(i, wrist));
  const wristAbovePullingFingers = pullingFingers.every(i => isAbove(wrist, i));

  return pullingFingersLeftOfRest && pullingFingersLeftOfWrist && wristAbovePullingFingers;
}

// Export instance
export const reze = getReze(COUNT);
