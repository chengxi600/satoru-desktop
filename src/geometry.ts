import { PointCloudShape } from "./data";

export function getShrine(vertexCount: number): PointCloudShape {
  const shrine = new PointCloudShape(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    let x = 0, y = 0, z = 0;
    let r = 0, g = 0, b = 0;
    let s = 0;

    if (i < vertexCount * 0.3) {
      // Ground
      x = (Math.random() - 0.5) * 80;
      y = -15;
      z = (Math.random() - 0.5) * 80;
      r = 0.4; g = 0; b = 0;
      s = 0.8;
    }
    else if (i < vertexCount * 0.4) {
      // Pillars
      const px = ((i % 4) < 2 ? 1 : -1) * 12;
      const pz = ((i % 4) % 2 === 0 ? 1 : -1) * 8;

      x = px + (Math.random() - 0.5) * 2;
      y = -15 + Math.random() * 30;
      z = pz + (Math.random() - 0.5) * 2;
      r = 0.2; g = 0.2; b = 0.2;
      s = 0.6;
    }
    else if (i < vertexCount * 0.6) {
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

    const i3 = i * 3;

    shrine.verticies[i3] = x;
    shrine.verticies[i3 + 1] = y;
    shrine.verticies[i3 + 2] = z;

    shrine.colors[i3] = r;
    shrine.colors[i3 + 1] = g;
    shrine.colors[i3 + 2] = b;

    shrine.sizes[i] = s;

    shrine.rotationDelta.set(0, 0, 0);
  }

  shrine.name = "Malevolent Shrine";
  shrine.shakeIntensity = 0.4;
  shrine.bloomPassStrength = 2.5;
  shrine.rotationDelta.set(0, 0, 0);

  return shrine;
}

export function getVoid(vertexCount: number): PointCloudShape {
  const infiniteVoid = new PointCloudShape(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    let x = 0, y = 0, z = 0;
    let r = 0, g = 0, b = 0;
    let s = 0;

    if (i < vertexCount * 0.15) {
      // Inner glowing ring
      const angle = Math.random() * Math.PI * 2;

      x = 26 * Math.cos(angle);
      y = 26 * Math.sin(angle);
      z = (Math.random() - 0.5) * 1;

      r = 1;
      g = 1;
      b = 1;
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

  infiniteVoid.name = "Infinite Void";
  infiniteVoid.shakeIntensity = 0.3;
  infiniteVoid.bloomPassStrength = 2.0;
  infiniteVoid.rotationDelta.set(0, 0.005, 0);

  return infiniteVoid;
}

export function getPurple(vertexCount: number): PointCloudShape {
  const purple = new PointCloudShape(vertexCount);
  for (let i = 0; i < vertexCount; i++) {
    let x: number, y: number, z: number, r: number, g: number, b: number, s: number;

    if (Math.random() > 0.8) {
        // Random scattered particles
        x = (Math.random() - 0.5) * 100;
        y = (Math.random() - 0.5) * 100;
        z = (Math.random() - 0.5) * 100;
        r = 0.5;
        g = 0.5;
        b = 0.7;
        s = 0.8;
    } else {
        // Clustered spherical particles
        const radius = 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);
        r = 0.6;
        g = 0.5;
        b = 1.0;
        s = 2.5;
    }

    // Fill shape arrays
    purple.verticies[i * 3 + 0] = x;
    purple.verticies[i * 3 + 1] = y;
    purple.verticies[i * 3 + 2] = z;

    purple.colors[i * 3 + 0] = r;
    purple.colors[i * 3 + 1] = g;
    purple.colors[i * 3 + 2] = b;

    purple.sizes[i] = s;
  }

  purple.name = "Purple";
  purple.shakeIntensity = 0.4;
  purple.bloomPassStrength = 4.0;
  purple.rotationDelta.set(0, 0.05, 0.2);

  return purple;
}

export function getRed(vertexCount: number): PointCloudShape {
  const red = new PointCloudShape(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    let x: number, y: number, z: number, r: number, g: number, b: number, s: number;

    if (i < vertexCount * 0.1) {
        // Dense central cluster
        const radius = Math.random() * 9;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);

        r = 3;
        g = 0.1;
        b = 0.1;
        s = 2.5;
    } else {
        // Spinning arms
        const armCount = 3;
        const t = i / vertexCount;
        const angle = t * 15 + ((i % armCount) * (Math.PI * 2 / armCount));
        const radius = 2 + (t * 40);

        x = radius * Math.cos(angle);
        y = radius * Math.sin(angle);
        z = (Math.random() - 0.5) * (10 * t);

        r = 0.8;
        g = 0;
        b = 0;
        s = 1.0;
    }

    red.verticies[i * 3 + 0] = x;
    red.verticies[i * 3 + 1] = y;
    red.verticies[i * 3 + 2] = z;

    red.colors[i * 3 + 0] = r;
    red.colors[i * 3 + 1] = g;
    red.colors[i * 3 + 2] = b;

    red.sizes[i] = s;
  }

  red.name = "Red";
  red.shakeIntensity = 0.4;
  red.bloomPassStrength = 2.5;
  red.rotationDelta.set(0, 0, -0.1);

  return red;
}

export function getBlue(vertexCount: number): PointCloudShape {
  const blue = new PointCloudShape(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    let x: number, y: number, z: number, r: number, g: number, b: number, s: number;

    if (i < vertexCount * 0.3) {
      // Dense core
      const radius = Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);

      r = 0.3;
      g = 0.4;
      b = 1.0;
      s = 2.5;
    } else {
      // Misty halo
      const radius = 12 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);

      r = 0.2 + Math.random() * 0.1;
      g = 0.3 + Math.random() * 0.1;
      b = 0.8 + Math.random() * 0.2;
      s = 0.5 + Math.random(); // smaller misty particles
    }

    blue.verticies[i * 3 + 0] = x;
    blue.verticies[i * 3 + 1] = y;
    blue.verticies[i * 3 + 2] = z;

    blue.colors[i * 3 + 0] = r;
    blue.colors[i * 3 + 1] = g;
    blue.colors[i * 3 + 2] = b;

    blue.sizes[i] = s;
  }

  blue.name = "Blue";
  blue.shakeIntensity = 0.2;       // subtle movement
  blue.bloomPassStrength = 1.5;    // soft glow
  blue.rotationDelta.set(0, 0, 0.1); // slow spin

  return blue;
}

export function getNeutral(vertexCount: number): PointCloudShape {
  const neutral = new PointCloudShape(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    let x: number, y: number, z: number, r: number, g: number, b: number, s: number;

    if (i < vertexCount * 0.05) {
        // Small scattered cluster at the center
        const radius = 15 + Math.random() * 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);

        r = 0.1;
        g = 0.1;
        b = 0.2;
        s = 0.4;
    } else {
        // Rest of the particles are inactive / invisible
        x = 0; y = 0; z = 0;
        r = 0; g = 0; b = 0;
        s = 0;
    }

    neutral.verticies[i * 3 + 0] = x;
    neutral.verticies[i * 3 + 1] = y;
    neutral.verticies[i * 3 + 2] = z;

    neutral.colors[i * 3 + 0] = r;
    neutral.colors[i * 3 + 1] = g;
    neutral.colors[i * 3 + 2] = b;

    neutral.sizes[i] = s;
  }

  neutral.name = "Neutral";
  neutral.shakeIntensity = 0;
  neutral.bloomPassStrength = 1.0;
  neutral.rotationDelta.set(0, 0.005, 0);

  return neutral;
}
