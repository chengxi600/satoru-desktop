import { COUNT, Technique, TechniqueName, createShape, createTechnique } from "./base";

function getShrine(vertexCount: number): Technique {
  const shrine = createShape(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    let x = 0, y = 0, z = 0;
    let r = 0, g = 0, b = 0;
    let s = 0;

    if (i < vertexCount * 0.25) {
      // Ground
      x = (Math.random() - 0.5) * 80;
      y = -15;
      z = (Math.random() - 0.5) * 80;

      r = 0.4; g = 0; b = 0;
      s = 0.8;
    }
    else if (i < vertexCount * 0.35) {
      // Pillars
      const px = ((i % 4) < 2 ? 1 : -1) * 12;
      const pz = ((i % 4) % 2 === 0 ? 1 : -1) * 8;

      x = px + (Math.random() - 0.5) * 2;
      y = -15 + Math.random() * 30;
      z = pz + (Math.random() - 0.5) * 2;

      r = 0.2; g = 0.2; b = 0.2;
      s = 0.6;
    }
    else if (i < vertexCount * 0.5) {
      // Roof curve
      const t = Math.random() * Math.PI * 2;
      const rad = Math.random() * 30;
      const curve = Math.pow(rad / 30, 2) * 10;

      x = rad * Math.cos(t);
      y = 15 - curve + (Math.random() * 2);
      z = rad * Math.sin(t) * 0.6;

      r = 0.6; g = 0; b = 0;
      s = 0.6;
    }
    else {
      // 🔥 Aggressive outer attack sphere
      const radius = 60 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = 80 + Math.random() * 200; // spawn far away toward +Z

      r = 0.8 + Math.random() * 0.2;
      g = 0.0;
      b = 0.0;

      s = 0.8 + Math.random() * 1.2;
    }

    const i3 = i * 3;

    shrine.verticies[i3] = x;
    shrine.verticies[i3 + 1] = y;
    shrine.verticies[i3 + 2] = z;

    shrine.colors[i3] = r;
    shrine.colors[i3 + 1] = g;
    shrine.colors[i3 + 2] = b;

    shrine.sizes[i] = s;
  }

  shrine.shakeIntensity = 0.7;    
  shrine.bloomPassStrength = 3.5;     
  shrine.rotationDelta.set(0, 0, 0);

  return createTechnique(TechniqueName.MalevolentShrine, shrine, "/audio/shrine.mp3");
}
export const shrine = getShrine(COUNT);
