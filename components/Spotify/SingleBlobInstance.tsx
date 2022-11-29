import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instance } from "@react-three/drei";

import type { InstancedMesh } from "three";

export default function SingleBlobInstance({
  random,
  color = new THREE.Color(),
  ...props
}) {
  const ref = useRef<InstancedMesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000;
    ref.current.rotation.set(
      Math.cos(t / 4) / 2,
      Math.sin(t / 4) / 2,
      Math.cos(t / 1.5) / 2
    );
    ref.current.position.y = Math.sin(t / 1.5) / 2;
    ref.current.scale.x =
      ref.current.scale.y =
      ref.current.scale.z =
        THREE.MathUtils.lerp(ref.current.scale.z, 1, 0.1);
  });

  return (
    <group {...props}>
      <Instance ref={ref} color={color} />
    </group>
  );
}
