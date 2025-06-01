"use client";

import { Suspense, useRef, useMemo } from "react";
import { MathUtils, type InstancedMesh } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  Environment,
  Preload,
  Instances,
  Instance,
  Lightformer,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "motion/react";

import { cn } from "@/lib/cn";

import { type AuraColor } from "@drgd/aura";

export function Background({ colors }: { colors: AuraColor[] }) {
  return (
    <Suspense fallback={null}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className={cn(
          "absolute inset-x-0 top-0 bottom-1",
          "pointer-events-none",
        )}
      >
        <Canvas
          flat
          gl={{
            antialias: false,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 50], fov: 50, near: 1, far: 200 }}
          performance={{ min: 0.5 }}
        >
          <Scene colors={colors} />
        </Canvas>
      </motion.div>
    </Suspense>
  );
}

function Blobs({ colors }: { colors: AuraColor[] }) {
  const particles = useMemo(() => {
    if (colors.length === 0) return [];

    return Array.from({ length: 50 }, () => ({
      factor: MathUtils.randInt(20, 100),
      speed: MathUtils.randFloat(0.01, 1),
      xFactor: MathUtils.randFloatSpread(80),
      yFactor: MathUtils.randFloatSpread(40),
      zFactor: MathUtils.randFloatSpread(40),
      color: colors[Math.floor(Math.random() * colors.length)].hex,
    }));
  }, [colors]);

  if (particles.length === 0) {
    return null;
  }

  return (
    <Instances limit={particles.length}>
      <icosahedronGeometry args={[1, 4]} />

      <MeshDistortMaterial
        distort={0.63}
        roughness={0.63}
        metalness={0.87}
        clearcoat={0.4}
        clearcoatRoughness={0.5}
        radius={1}
      />

      {particles.map((data, index) => (
        <BlobInstance key={`blob-${index}`} {...data} />
      ))}
    </Instances>
  );
}

function BlobInstance({
  factor,
  speed,
  xFactor,
  yFactor,
  zFactor,
  color,
}: {
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
  color: string;
}) {
  const ref = useRef<InstancedMesh>(null!);
  const initialSize = useRef(MathUtils.randFloat(2, 8));
  const sizeChangeSpeed = useRef(MathUtils.randFloat(0.1, 0.5));

  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * speed;
    const sizeNoise = Math.sin(t * sizeChangeSpeed.current) * 0.5 + 0.5;
    const currentSize = MathUtils.lerp(
      initialSize.current * 0.5,
      initialSize.current * 1.5,
      sizeNoise,
    );

    ref.current.scale.setScalar(currentSize);

    const positionNoise = (axis: number) =>
      Math.sin(t * 0.2 + axis) * 2 + Math.cos(t * 0.3 + axis) * 3;

    ref.current.position.set(
      xFactor + positionNoise(0),
      yFactor + positionNoise(1),
      zFactor + positionNoise(2),
    );

    ref.current.rotation.set(
      Math.sin(t * 0.3) * Math.PI,
      Math.cos(t * 0.2) * Math.PI,
      Math.sin(t * 0.1) * Math.PI,
    );
  });

  return <Instance ref={ref} color={color} />;
}

function Scene({ colors }: { colors: AuraColor[] }) {
  return (
    <>
      <ambientLight intensity={1.5} />

      <Blobs colors={colors} />

      <EffectComposer>
        <Bloom mipmapBlur={true} luminanceThreshold={0.4} intensity={1.58} />
      </EffectComposer>

      <Preload all />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="ring"
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={8}
          />
          <Lightformer
            form="circle"
            intensity={1.8}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2.2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={4}
          />
          <Lightformer
            form="ring"
            intensity={1.8}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={10}
          />
        </group>
      </Environment>
    </>
  );
}
