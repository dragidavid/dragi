import * as THREE from "three";
import { MeshDistortMaterial, Instances } from "@react-three/drei";

import SingleBlobInstance from "components/Spotify/SingleBlobInstance";

import { random } from "lib/utils";

import type { Color } from "lib/types";

export default function InstancedBlobs({ colors = [] }: { colors?: Color[] }) {
  if (colors.length <= 0) {
    return null;
  }

  const particles = Array.from({ length: 50 }, () => ({
    factor: THREE.MathUtils.randInt(20, 100),
    speed: THREE.MathUtils.randFloat(0.01, 1),
    xFactor: THREE.MathUtils.randFloatSpread(80),
    yFactor: THREE.MathUtils.randFloatSpread(40),
    zFactor: THREE.MathUtils.randFloatSpread(40),
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
