import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import {
  MeshDistortMaterial,
  GradientTexture,
  Instances,
  Instance,
} from "@react-three/drei";

import { random } from "lib/utils";

import type { Mesh, InstancedMesh } from "three";
import type { Color } from "lib/types";

import { data } from "./store";
import SingleBlobInstance from "components/Spotify/SingleBlobInstance";

interface InstancedBlobsProps {
  colors?: Color[];
}

export default function InstancedBlobs({ colors = [] }: InstancedBlobsProps) {
  if (colors.length <= 0) {
    return null;
  }

  return (
    <Instances range={colors.length}>
      <icosahedronBufferGeometry args={[2, 128, 128]} />

      <MeshDistortMaterial
        distort={0.5}
        // opacity={0.7}
        // transparent={true}
      />

      <group position={[0, 0, 0]}>
        {/* {colors.map((color, i) => (
          <Instance key={i} color={color.hex} />
        ))} */}
        {data.map((props, i) => (
          <SingleBlobInstance key={i} {...props} />
        ))}
      </group>

      {/* <Instance
        color="green"
        scale={0.5}
        position={[0, 1, 1]}
        rotation={[Math.PI / 3, 0, 0]}
      />
      <Instance
        color="blue"
        scale={1}
        position={[0, -1, 1]}
        rotation={[Math.PI / 3, 0, 0]}
      />
      <Instance
        color="red"
        scale={0.7}
        position={[1, -1, 1]}
        rotation={[Math.PI / 3, 0, 0]}
      />
      <Instance
        color="hotpink"
        scale={1}
        position={[1, 2, 3]}
        rotation={[Math.PI / 3, 0, 0]}
      /> */}
    </Instances>
  );
}
