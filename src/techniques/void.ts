import { COUNT, Technique, createShape, createTechnique } from "./base";

function getVoid(vertexCount: number): Technique {
  const infiniteVoid = createShape(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    let x: number = 0;
    let y: number = 0;
    let z: number = 0;
    let r: number = 0;
    let g: number = 0;
    let b: number = 0;
    let s: number = 0;

    if (i < vertexCount * 0.15) {
      // Inner glowing ring
      const angle = Math.random() * Math.PI * 2;

      x = 26 * Math.cos(angle);
      y = 26 * Math.sin(angle);
      z = (Math.random() - 0.5) * 1;

      r = 1.0;
      g = 1.0;
      b = 1.0;
      s = 2.5;
    } else {
      // Outer cosmic sphere
      const radius = 30 + Math.random() * 90;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);

      r = 0.1;
      g = 0.6;
      b = 1.0;
      s = 0.7;
    }

    const i3 = i * 3;

    infiniteVoid.verticies[i3] = x;
    infiniteVoid.verticies[i3 + 1] = y;
    infiniteVoid.verticies[i3 + 2] = z;

    infiniteVoid.colors[i3] = r;
    infiniteVoid.colors[i3 + 1] = g;
    infiniteVoid.colors[i3 + 2] = b;

    infiniteVoid.sizes[i] = s;
  }

  infiniteVoid.shakeIntensity = 0.3;
  infiniteVoid.bloomPassStrength = 2.0;
  infiniteVoid.rotationDelta.set(0, 0.005, 0);

  return createTechnique("Infinite Void", infiniteVoid, "/audio/void.mp3");
}

export const voidTechnique = getVoid(COUNT);
