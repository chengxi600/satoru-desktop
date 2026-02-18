import { COUNT, Technique, TechniqueName, createShape, createTechnique } from "./base";

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

  return createTechnique(TechniqueName.Purple, purple, "/audio/purple.mp3");
}

export const purple = getPurple(COUNT);