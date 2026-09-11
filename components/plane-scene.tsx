"use client";
import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import {
  BufferGeometry,
  Float32BufferAttribute,
  DoubleSide,
  MathUtils,
  type Group,
} from "three";
type Props = {
  active: boolean;
  pointer: RefObject<{ x: number; y: number }>;
  spin: number;
  onReady: () => void;
  onFailure: () => void;
};
function Sculpture({ pointer, spin }: Pick<Props, "pointer" | "spin">) {
  const group = useRef<Group>(null),
    time = useRef(0);
  const geometry = useMemo(() => {
    const tip = [2.65, 1.25, -0.2],
      left = [-2.3, -0.12, 0.12],
      fold = [-0.65, -0.63, 0.55],
      keel = [-0.24, -1.67, -0.1],
      rightFold = [0.13, -0.74, 0.45],
      right = [1.25, -1.03, -0.12];
    const g = new BufferGeometry();
    g.setAttribute(
      "position",
      new Float32BufferAttribute(
        [
          ...tip,
          ...left,
          ...fold,
          ...tip,
          ...fold,
          ...keel,
          ...tip,
          ...keel,
          ...rightFold,
          ...tip,
          ...rightFold,
          ...right,
        ],
        3,
      ),
    );
    g.computeVertexNormals();
    return g;
  }, []);
  useFrame((_, delta) => {
    if (!group.current) return;
    time.current += Math.min(delta, 0.05);
    const g = group.current;
    g.rotation.y = MathUtils.damp(
      g.rotation.y,
      pointer.current.x * 0.3 + spin * Math.PI * 2,
      4,
      delta,
    );
    g.rotation.x = MathUtils.damp(
      g.rotation.x,
      -0.12 + pointer.current.y * 0.18,
      3,
      delta,
    );
    g.rotation.z = MathUtils.damp(
      g.rotation.z,
      0.05 + Math.sin(time.current * 0.5) * 0.025,
      3,
      delta,
    );
    g.position.y = Math.sin(time.current * 0.75) * 0.055;
  });
  return (
    <group ref={group}>
      <mesh geometry={geometry} castShadow>
        <meshPhysicalMaterial
          color="#f5f3ee"
          roughness={0.6}
          metalness={0.05}
          clearcoat={0.15}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[1.02, -0.89, -0.02]} rotation={[0, 0, -0.15]}>
        <planeGeometry args={[0.4, 0.09]} />
        <meshStandardMaterial color="#d6ff3f" side={DoubleSide} />
      </mesh>
    </group>
  );
}
export default function PlaneScene({
  active,
  pointer,
  spin,
  onReady,
  onFailure,
}: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.6], fov: 43 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onFailure, {
          once: true,
        });
        onReady();
      }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[-3, 4, 6]} intensity={3.2} color="#fffbea" />
      <directionalLight
        position={[3, -2, 3]}
        intensity={0.45}
        color="#d6ff3f"
      />
      <Sculpture pointer={pointer} spin={spin} />
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.25}
        scale={8}
        blur={3}
        far={4}
        frames={1}
      />
    </Canvas>
  );
}
