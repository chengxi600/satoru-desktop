import { COUNT, Technique, createShape, createTechnique } from "./base";

function getNeutral(vertexCount: number): Technique {
  const neutral = createShape(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    let x = 0, y = 0, z = 0;
    let r = 0, g = 0, b = 0;
    let s = 0;

    if (i < vertexCount * 0.05) {
      const radius = 15 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);

      r = 0.1; g = 0.1; b = 0.2;
      s = 0.4;
    }

    const i3 = i * 3;
    neutral.verticies[i3] = x;
    neutral.verticies[i3 + 1] = y;
    neutral.verticies[i3 + 2] = z;
    neutral.colors[i3] = r;
    neutral.colors[i3 + 1] = g;
    neutral.colors[i3 + 2] = b;
    neutral.sizes[i] = s;
  }

  neutral.shakeIntensity = 0;
  neutral.bloomPassStrength = 1.0;
  neutral.rotationDelta.set(0, 0.005, 0);

  return createTechnique("Neutral", neutral, "/audio/neutral.mp3");
}

export const neutral = getNeutral(COUNT);