import * as THREE from 'three';

const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles - Reduce count significantly on mobile for performance
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 150 : 500;
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const baseVelocities = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const colorBlue = new THREE.Color('#00d4ff');
  const colorPurple = new THREE.Color('#7c3aed');

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 14;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 8;

    const vx = (Math.random() - 0.5) * 0.003;
    const vy = (Math.random() - 0.5) * 0.003;
    const vz = (Math.random() - 0.5) * 0.002;

    velocities[i] = vx;
    velocities[i + 1] = vy;
    velocities[i + 2] = vz;

    baseVelocities[i] = vx;
    baseVelocities[i + 1] = vy;
    baseVelocities[i + 2] = vz;

    // Randomize colors for each particle
    const mixedColor = colorBlue.clone().lerp(colorPurple, Math.random());
    colors[i] = mixedColor.r;
    colors[i + 1] = mixedColor.g;
    colors[i + 2] = mixedColor.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.025,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Lines between nearby particles
  const lineGeometry = new THREE.BufferGeometry();
  const maxLines = count * 3;
  const linePositions = new Float32Array(maxLines * 6);
  const lineColors = new Float32Array(maxLines * 6);
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  // Mouse tracking
  const mouse = { x: 0, y: 0 };
  let scrollY = window.scrollY;

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animate
  const blue = new THREE.Color('#00d4ff');
  const purple = new THREE.Color('#7c3aed');
  const connectionDistance = 1.8;

  function animate() {
    requestAnimationFrame(animate);

    // Continuous slow scene rotation
    scene.rotation.y += 0.0005;
    scene.rotation.x += 0.0002;

    const posArr = geometry.attributes.position.array as Float32Array;

    const worldMouseX = mouse.x * 8;
    const worldMouseY = mouse.y * 5;

    // Move particles
    for (let i = 0; i < count * 3; i += 3) {
      // Return slowly to base velocity
      velocities[i] += (baseVelocities[i] - velocities[i]) * 0.02;
      velocities[i + 1] += (baseVelocities[i + 1] - velocities[i + 1]) * 0.02;
      velocities[i + 2] += (baseVelocities[i + 2] - velocities[i + 2]) * 0.02;

      // Mouse repulsion (Magnetic effect)
      const dx = posArr[i] - worldMouseX;
      const dy = posArr[i + 1] - worldMouseY;
      const distSq = dx * dx + dy * dy;

      if (distSq < 4) { // Within radius
        const force = (4 - distSq) * 0.001;
        const dist = Math.sqrt(distSq) || 0.1;
        velocities[i] += (dx / dist) * force;
        velocities[i + 1] += (dy / dist) * force;
      }

      posArr[i] += velocities[i];
      posArr[i + 1] += velocities[i + 1];
      posArr[i + 2] += velocities[i + 2];

      // Boundary wrap
      if (posArr[i] > 7) posArr[i] = -7;
      if (posArr[i] < -7) posArr[i] = 7;
      if (posArr[i + 1] > 5) posArr[i + 1] = -5;
      if (posArr[i + 1] < -5) posArr[i + 1] = 5;
    }

    geometry.attributes.position.needsUpdate = true;

    // Update connections
    let lineIndex = 0;
    const lPos = lineGeometry.attributes.position.array as Float32Array;
    const lCol = lineGeometry.attributes.color.array as Float32Array;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (lineIndex >= maxLines) break;

        const dx = posArr[i * 3] - posArr[j * 3];
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          const alpha = 1 - dist / connectionDistance;
          const color = blue.clone().lerp(purple, alpha);

          const idx = lineIndex * 6;
          lPos[idx] = posArr[i * 3];
          lPos[idx + 1] = posArr[i * 3 + 1];
          lPos[idx + 2] = posArr[i * 3 + 2];
          lPos[idx + 3] = posArr[j * 3];
          lPos[idx + 4] = posArr[j * 3 + 1];
          lPos[idx + 5] = posArr[j * 3 + 2];

          lCol[idx] = color.r * alpha;
          lCol[idx + 1] = color.g * alpha;
          lCol[idx + 2] = color.b * alpha;
          lCol[idx + 3] = color.r * alpha;
          lCol[idx + 4] = color.g * alpha;
          lCol[idx + 5] = color.b * alpha;

          lineIndex++;
        }
      }
      if (lineIndex >= maxLines) break;
    }

    // Zero out remaining lines
    for (let i = lineIndex * 6; i < maxLines * 6; i++) {
      lPos[i] = 0;
      lCol[i] = 0;
    }

    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
    lineGeometry.setDrawRange(0, lineIndex * 2);

    // Camera movement: Parallax from scroll and mouse
    const targetX = mouse.x * 0.5;
    // Connect scroll depth to vertical camera movement
    const targetY = mouse.y * 0.3 - (scrollY * 0.0015);

    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();
}
