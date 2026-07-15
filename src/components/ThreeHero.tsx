"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

interface ThreeHeroProps {
  scrollProgress?: number; // 0 = top of hero, 1 = fully scrolled past hero
}

export default function ThreeHero({ scrollProgress = 0 }: ThreeHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  // Keep scrollRef in sync without re-running the effect
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let isMounted = true;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const bluePointLight = new THREE.PointLight(0x00d2ff, 2, 10);
    bluePointLight.position.set(-2, 2, 2);
    scene.add(bluePointLight);

    const yellowPointLight = new THREE.PointLight(0xffe600, 2, 10);
    yellowPointLight.position.set(2, -2, 2);
    scene.add(yellowPointLight);

    const modelsGroup = new THREE.Group();
    scene.add(modelsGroup);

    // 3. Materials
    const blueGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3776ab,
      roughness: 0.18, metalness: 0.1,
      clearcoat: 1.0, clearcoatRoughness: 0.05,
      side: THREE.DoubleSide,
    });
    const yellowGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffd43b,
      roughness: 0.18, metalness: 0.1,
      clearcoat: 1.0, clearcoatRoughness: 0.05,
      side: THREE.DoubleSide,
    });
    const outlineMaterialBlue = new THREE.LineBasicMaterial({ color: 0x3776ab, linewidth: 1.5 });
    const outlineMaterialYellow = new THREE.LineBasicMaterial({ color: 0xffd43b, linewidth: 1.5 });

    // 4. Python Logo from SVG
    const pythonGroup = new THREE.Group();
    pythonGroup.position.set(0, 0, 0);
    modelsGroup.add(pythonGroup);

    const svgLoader = new SVGLoader();
    svgLoader.load("/images/python.svg", (svgData) => {
      if (!isMounted) return;
      svgData.paths.forEach((path, pathIdx) => {
        const shapes = SVGLoader.createShapes(path);
        const isBlueColor = pathIdx === 0;
        shapes.forEach((shape) => {
          const pyGeo = new THREE.ExtrudeGeometry(shape, {
            depth: 1.0, bevelEnabled: true,
            bevelSegments: 3, steps: 1,
            bevelSize: 0.15, bevelThickness: 0.15,
          });
          pyGeo.translate(-16, -16, -0.5);
          pyGeo.scale(0.135, -0.135, 0.135);
          const pyMesh = new THREE.Mesh(pyGeo, isBlueColor ? blueGlassMaterial : yellowGlassMaterial);
          const pyEdges = new THREE.EdgesGeometry(pyGeo, 25);
          const pyLine = new THREE.LineSegments(pyEdges, isBlueColor ? outlineMaterialBlue : outlineMaterialYellow);
          pyMesh.add(pyLine);
          pythonGroup.add(pyMesh);
        });
      });
    }, undefined, (err) => console.error("Error loading python.svg:", err));

    // 5. Background Dust
    const dustCount = 150;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 15;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ size: 0.03, color: 0x4d5d6d, transparent: true, opacity: 0.4 });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // Background Lines
    const bgLinesGroup = new THREE.Group();
    const p1 = [new THREE.Vector3(-45, -25, -5), new THREE.Vector3(45, 25, -5)];
    const geo1 = new THREE.BufferGeometry().setFromPoints(p1);
    const mat1 = new THREE.LineBasicMaterial({ color: 0x3d4a5d, transparent: true, opacity: 0.35 });
    bgLinesGroup.add(new THREE.Line(geo1, mat1));

    const p2 = [new THREE.Vector3(-48, -20, -5), new THREE.Vector3(42, 30, -5)];
    const geo2 = new THREE.BufferGeometry().setFromPoints(p2);
    const mat2 = new THREE.LineDashedMaterial({ color: 0x3d4a5d, transparent: true, opacity: 0.25, dashSize: 0.8, gapSize: 0.4 });
    const line2 = new THREE.Line(geo2, mat2);
    line2.computeLineDistances();
    bgLinesGroup.add(line2);

    const p3 = [new THREE.Vector3(-35, -40, -5), new THREE.Vector3(35, 40, -5)];
    const geo3 = new THREE.BufferGeometry().setFromPoints(p3);
    const mat3 = new THREE.LineBasicMaterial({ color: 0x3d4a5d, transparent: true, opacity: 0.3 });
    bgLinesGroup.add(new THREE.Line(geo3, mat3));
    scene.add(bgLinesGroup);

    // 6. SCROLL-BLAST Particles — more particles, wider spread for fullscreen effect
    const blastParticlesCount = 900;
    const blastGeo = new THREE.BufferGeometry();
    const blastPos = new Float32Array(blastParticlesCount * 3);
    const blastColors = new Float32Array(blastParticlesCount * 3);
    const blastVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < blastParticlesCount; i++) {
      blastPos[i * 3] = 0;
      blastPos[i * 3 + 1] = 0;
      blastPos[i * 3 + 2] = 0;

      const isBlue = Math.random() > 0.5;
      if (isBlue) {
        blastColors[i * 3] = 48 / 255;
        blastColors[i * 3 + 1] = 105 / 255;
        blastColors[i * 3 + 2] = 152 / 255;
      } else {
        blastColors[i * 3] = 255 / 255;
        blastColors[i * 3 + 1] = 212 / 255;
        blastColors[i * 3 + 2] = 59 / 255;
      }

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 0.08 + Math.random() * 0.25; // faster for fullscreen spread
      blastVelocities.push(new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * speed,
        Math.sin(phi) * Math.sin(theta) * speed,
        Math.cos(phi) * speed
      ));
    }

    blastGeo.setAttribute("position", new THREE.BufferAttribute(blastPos, 3));
    blastGeo.setAttribute("color", new THREE.BufferAttribute(blastColors, 3));

    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16; pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const blastMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      map: pTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const blastSystem = new THREE.Points(blastGeo, blastMat);
    scene.add(blastSystem);

    // 7. Interaction — mouse parallax only (no hold-to-blast)
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    raycaster.params.Line.threshold = 0.55;

    let isHovered = false;
    let shockTimer = 0;
    const originalColor = new THREE.Color(0x3d4a5d);

    const getClosestPointOnSegment = (Q: THREE.Vector3, S: THREE.Vector3, E: THREE.Vector3): THREE.Vector3 => {
      const dir = new THREE.Vector3().subVectors(E, S);
      const lenSq = dir.lengthSq();
      if (lenSq === 0) return S.clone();
      const t = Math.max(0, Math.min(1, new THREE.Vector3().subVectors(Q, S).dot(dir) / lenSq));
      return S.clone().add(dir.multiplyScalar(t));
    };

    const createLightningBolt = (start: THREE.Vector3, end: THREE.Vector3) => {
      const pts = [start.clone()];
      const direction = new THREE.Vector3().subVectors(end, start);
      const numSegments = 6;
      const dirNormalized = direction.clone().normalize();
      const perp = new THREE.Vector3(-dirNormalized.y, dirNormalized.x, 0).normalize();
      for (let i = 1; i < numSegments; i++) {
        const fraction = i / numSegments;
        const pt = start.clone().lerp(end, fraction);
        pt.addScaledVector(perp, (Math.random() - 0.5) * 0.5);
        pt.z += (Math.random() - 0.5) * 0.1;
        pts.push(pt);
      }
      pts.push(end.clone());
      return pts;
    };

    const triggerElectricShock = (point: THREE.Vector3, hitObject: THREE.Line) => {
      const hitMat = hitObject.material as THREE.LineBasicMaterial | THREE.LineDashedMaterial;
      hitMat.color.setHex(0x00ffff);
      hitMat.opacity = 1.0;
      shockTimer = 20;

      const otherLines = bgLinesGroup.children.filter(child => child !== hitObject) as THREE.Line[];
      if (otherLines.length === 0) return;

      let bestTargetPoint = new THREE.Vector3();
      let minDistance = Infinity;
      let targetLineToFlash: THREE.Line | null = null;

      otherLines.forEach((line) => {
        const positionAttr = line.geometry.getAttribute("position");
        if (positionAttr && positionAttr.count >= 2) {
          const S = new THREE.Vector3(positionAttr.getX(0), positionAttr.getY(0), positionAttr.getZ(0));
          const E = new THREE.Vector3(positionAttr.getX(1), positionAttr.getY(1), positionAttr.getZ(1));
          const closest = getClosestPointOnSegment(point, S, E);
          const dist = point.distanceTo(closest);
          if (dist < minDistance) { minDistance = dist; bestTargetPoint = closest; targetLineToFlash = line; }
        }
      });

      if (targetLineToFlash) {
        const targetMat = (targetLineToFlash as THREE.Line).material as THREE.LineBasicMaterial | THREE.LineDashedMaterial;
        targetMat.color.setHex(0x00ffff);
        targetMat.opacity = 1.0;
      }

      const lightningGroup = new THREE.Group();
      for (let b = 0; b < 2; b++) {
        const pts = createLightningBolt(point, bestTargetPoint);
        const lightningGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const lightningMat = new THREE.LineBasicMaterial({
          color: Math.random() > 0.4 ? 0x00ffff : 0xffffff,
          transparent: true, opacity: 0.95,
        });
        lightningGroup.add(new THREE.Line(lightningGeo, lightningMat));
      }
      scene.add(lightningGroup);

      setTimeout(() => {
        scene.remove(lightningGroup);
        lightningGroup.traverse((child) => {
          if (child instanceof THREE.Line) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
            else child.material.dispose();
          }
        });
      }, 150);

      [point, bestTargetPoint].forEach((sp) => {
        const sparkCount = 8;
        const sparkGeo = new THREE.BufferGeometry();
        const sparkPos = new Float32Array(sparkCount * 3);
        const sparkVels: THREE.Vector3[] = [];
        for (let i = 0; i < sparkCount; i++) {
          sparkPos[i * 3] = sp.x; sparkPos[i * 3 + 1] = sp.y; sparkPos[i * 3 + 2] = sp.z;
          const angle = Math.random() * Math.PI * 2;
          const spd = 0.03 + Math.random() * 0.06;
          sparkVels.push(new THREE.Vector3(Math.cos(angle) * spd, Math.sin(angle) * spd, (Math.random() - 0.5) * spd));
        }
        sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
        const sparkMat = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.035, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
        const sparks = new THREE.Points(sparkGeo, sparkMat);
        scene.add(sparks);
        let frame = 0;
        const animateSparks = () => {
          if (frame < 18) {
            frame++;
            const posArr = sparkGeo.getAttribute("position").array as Float32Array;
            for (let i = 0; i < sparkCount; i++) {
              posArr[i * 3] += sparkVels[i].x; posArr[i * 3 + 1] += sparkVels[i].y; posArr[i * 3 + 2] += sparkVels[i].z;
              sparkVels[i].multiplyScalar(0.92);
            }
            sparkGeo.getAttribute("position").needsUpdate = true;
            sparkMat.opacity *= 0.86;
            requestAnimationFrame(animateSparks);
          } else { scene.remove(sparks); sparkGeo.dispose(); sparkMat.dispose(); }
        };
        animateSparks();
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      targetMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const touch = e.touches[0];
      targetMouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);

    // 8. Animation loop — blast driven by scrollRef
    let animId: number;
    const clock = new THREE.Clock();
    let pythonScale = 1.0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const isBlasting = scrollRef.current > 0.05;

      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;
      camera.position.x = mouse.x * 1.8;
      camera.position.y = mouse.y * 1.8;
      camera.lookAt(0, 0, 0);

      // Raycasting for electric shock on lines
      raycaster.setFromCamera(targetMouse, camera);
      const intersects = raycaster.intersectObjects(bgLinesGroup.children);
      if (intersects.length > 0) {
        if (!isHovered) {
          isHovered = true;
          triggerElectricShock(intersects[0].point, intersects[0].object as THREE.Line);
        }
      } else { isHovered = false; }

      if (shockTimer > 0) {
        shockTimer--;
        bgLinesGroup.children.forEach((child, idx) => {
          const line = child as THREE.Line;
          const mat = line.material as THREE.LineBasicMaterial | THREE.LineDashedMaterial;
          mat.color.lerp(originalColor, 0.08);
          const origOpacity = idx === 0 ? 0.35 : idx === 1 ? 0.25 : 0.3;
          mat.opacity = origOpacity + (1.0 - origOpacity) * (shockTimer / 20);
        });
      }

      dustParticles.rotation.y = time * 0.015;
      pythonGroup.rotation.y = -time * 0.18;

      // Scroll-driven blast
      if (isBlasting) {
        const intensity = Math.min(scrollRef.current * 2, 1); // ramp up fast
        pythonScale += (0.0 - pythonScale) * 0.15;
        blastMat.opacity += (intensity - blastMat.opacity) * 0.1;

        const positions = blastGeo.getAttribute("position").array as Float32Array;
        for (let i = 0; i < blastParticlesCount; i++) {
          positions[i * 3] += blastVelocities[i].x;
          positions[i * 3 + 1] += blastVelocities[i].y;
          positions[i * 3 + 2] += blastVelocities[i].z;
          blastVelocities[i].multiplyScalar(0.988);
        }
        blastGeo.getAttribute("position").needsUpdate = true;
      } else {
        pythonScale += (1.0 - pythonScale) * 0.12;
        blastMat.opacity += (0.0 - blastMat.opacity) * 0.15;

        const positions = blastGeo.getAttribute("position").array as Float32Array;
        for (let i = 0; i < blastParticlesCount; i++) {
          positions[i * 3] += (0.0 - positions[i * 3]) * 0.15;
          positions[i * 3 + 1] += (0.0 - positions[i * 3 + 1]) * 0.15;
          positions[i * 3 + 2] += (0.0 - positions[i * 3 + 2]) * 0.15;

          if (Math.abs(positions[i * 3]) < 0.05) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const speed = 0.08 + Math.random() * 0.25;
            blastVelocities[i].set(
              Math.sin(phi) * Math.cos(theta) * speed,
              Math.sin(phi) * Math.sin(theta) * speed,
              Math.cos(phi) * speed
            );
          }
        }
        blastGeo.getAttribute("position").needsUpdate = true;
      }

      pythonGroup.scale.set(pythonScale, pythonScale, pythonScale);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", handleResize);
      pythonGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) child.geometry.dispose();
        if (child instanceof THREE.LineSegments) child.geometry.dispose();
      });
      blueGlassMaterial.dispose(); yellowGlassMaterial.dispose();
      outlineMaterialBlue.dispose(); outlineMaterialYellow.dispose();
      dustGeo.dispose(); dustMat.dispose(); blastGeo.dispose();
      bgLinesGroup.traverse((child) => {
        if (child instanceof THREE.Line) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
          else child.material.dispose();
        }
      });
      blastMat.dispose(); pTexture.dispose();
    };
  }, []); // No dependencies — scrollRef handles reactivity without re-init

  // Dynamic class based on scroll blast state
  const isBlasting = scrollProgress > 0.05;

  return (
    <div
      ref={containerRef}
      className={`three-hero-container ${isBlasting ? "blasting" : ""}`}
    >
      <canvas ref={canvasRef} className="three-hero-canvas" />
    </div>
  );
}
