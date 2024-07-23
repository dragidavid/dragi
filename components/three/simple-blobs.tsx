import { useMemo, useRef } from "react";
import { MathUtils, type InstancedMesh } from "three";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Instances, Instance } from "@react-three/drei";

import type { Color } from "lib/types";

export default function SimpleBlobs({ colors = [] }: { colors: Color[] }) {
  if (colors.length === 0) {
    return null;
  }

  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, () => ({
        factor: MathUtils.randInt(20, 100),
        speed: MathUtils.randFloat(0.01, 1),
        xFactor: MathUtils.randFloatSpread(80),
        yFactor: MathUtils.randFloatSpread(40),
        zFactor: MathUtils.randFloatSpread(40),
        color: colors[Math.floor(Math.random() * colors.length)].hex,
      })),
    [colors],
  );

  return (
    <Instances limit={particles.length}>
      <icosahedronGeometry args={[1, 16]} />

      <MeshDistortMaterial
        distort={0.6}
        roughness={0.8}
        metalness={1}
        clearcoat={0.4}
        clearcoatRoughness={1}
        radius={1}
      />

      {particles.map((data, index) => (
        <SingleBlobInstance key={`blob-${index}`} {...data} />
      ))}
    </Instances>
  );
}

function SingleBlobInstance({
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
