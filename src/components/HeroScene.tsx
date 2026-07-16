import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Cena 3D do hero: terreno low-poly ondulando com névoa cor de papel. */
export default function HeroScene({ wireframe = false }: { wireframe?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf6f4ef, 10, 42);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 5.2, 17);

    const geo = new THREE.PlaneGeometry(90, 46, 140, 70);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const base = new Float32Array(pos.array);
    const noise = (x: number, z: number) =>
      Math.sin(x * 0.32) * Math.cos(z * 0.28) * 1.6 +
      Math.sin(x * 0.11 + 2.1) * Math.cos(z * 0.13 + 1.3) * 3.2 +
      Math.sin(x * 0.71 + z * 0.53) * 0.45;

    const mat = new THREE.MeshStandardMaterial({
      color: 0x223047, flatShading: true, wireframe, roughness: 0.95, metalness: 0.05,
    });
    const terrain = new THREE.Mesh(geo, mat);
    terrain.position.y = -3.4;
    scene.add(terrain);

    scene.add(new THREE.AmbientLight(0xf6f4ef, 1.15));
    const sun = new THREE.DirectionalLight(0xffe8c9, 2.2);
    sun.position.set(-8, 10, 6);
    scene.add(sun);
    const blue = new THREE.DirectionalLight(0x7c93ff, 0.8);
    blue.position.set(10, 4, -6);
    scene.add(blue);

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouse);

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (window.scrollY > window.innerHeight * 1.2) return; // fora da tela: pula render
      const t = performance.now() / 1000;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < pos.count; i++) {
        arr[i * 3 + 1] = noise(base[i * 3] + t * 0.35, base[i * 3 + 2]);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      camera.position.x += (mx * 2.4 - camera.position.x) * 0.04;
      camera.position.y = 5.2 + my * -1.2 + window.scrollY * 0.004;
      camera.lookAt(0, 0.5, 0);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [wireframe]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
