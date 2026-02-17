import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { PointCloudShape } from './data';
import { COUNT, getCurrentShape } from './shapeStore';


if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    /**
     * Initialize Camera and Scene
     * 
     */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });


    const canvas = document.querySelector('#scene') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

    /**
     * Compose our rendered scene with bloom pass effect
     */
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );

    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    /**
     * Create Geometry Buffer shape
     */

    // Geometry
    const geometry = new THREE.BufferGeometry();

    // Create empty buffers
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Target point cloud shape
    let shape: PointCloudShape = new PointCloudShape(COUNT);

    // Material
    const material = new THREE.PointsMaterial({ size: 0.3, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false })

    // Points
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    function animate() {
      // Update current shape
      shape = getCurrentShape();

      // Shake Intensity
      if (shape.shakeIntensity > 0) {
        renderer.domElement.style.transform = `translate(${(Math.random() - 0.5) * shape.shakeIntensity * 40}px, ${(Math.random() - 0.5) * shape.shakeIntensity * 40}px)`;
      } else {
        renderer.domElement.style.transform = 'translate(0,0)';
      }

      /**
       * Move current geometry towards target geometry for smooth transition
       */
      const pos = particles.geometry.attributes.position.array;
      const col = particles.geometry.attributes.color.array;
      const siz = particles.geometry.attributes.size.array;

      for (let i = 0; i < COUNT * 3; i++) {
        pos[i] += (shape.verticies[i] - pos[i]) * 0.1;
        col[i] += (shape.colors[i] - col[i]) * 0.1;
      }

      for (let i = 0; i < COUNT; i++) {
        siz[i] += (shape.sizes[i] - siz[i]) * 0.1;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.color.needsUpdate = true;
      particles.geometry.attributes.size.needsUpdate = true;

      // Bloom Pass Strength
      bloomPass.strength = shape.bloomPassStrength;

      // Rotation
      particles.rotation.x += shape.rotationDelta.x;
      particles.rotation.y += shape.rotationDelta.y;
      particles.rotation.z += shape.rotationDelta.z;

      // Set rotation for shrine
      if (shape.name === "Malevolent Shrine") {
        particles.rotation.set(0, 0, 0);
      }

      composer.render();
    }
    renderer.setAnimationLoop(animate);
  });
}