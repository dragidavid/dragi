import { useRef } from "react";
import { MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Instances, Instance } from "@react-three/drei";

import { random } from "lib/utils";

import type { InstancedMesh } from "three";

export default function InstancedBlobs({
  colors = [],
}: {
  colors?: { name: string; hex: string }[];
}) {
  if (colors.length <= 0) {
    return null;
  }

  const particles = Array.from({ length: 50 }, () => ({
    factor: MathUtils.randInt(20, 100),
    speed: MathUtils.randFloat(0.01, 1),
    xFactor: MathUtils.randFloatSpread(80),
    yFactor: MathUtils.randFloatSpread(40),
    zFactor: MathUtils.randFloatSpread(40),
    color: colors[random(0, colors.length - 1)].hex,
  }));

  return (
    <Instances limit={particles.length}>
      <icosahedronGeometry args={[1, 16]} />

      <MeshDistortMaterial distort={0.5} opacity={0.8} transparent={true} />

      {particles.map((blobData, i) => (
        <SingleBlobInstance key={i} {...blobData} />
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

  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 2);

    ref.current.scale.setScalar(Math.max(4, Math.cos(t) * 10));

    ref.current.position.set(
      Math.cos(t) +
        Math.sin(t * 1) / 10 +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        zFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 10
    );

    ref.current.rotation.set(
      Math.cos(t / 4) / 2,
      Math.sin(t / 4) / 2,
      Math.cos(t / 1.5) / 2
    );
  });

  return <Instance ref={ref} color={color} />;
}
