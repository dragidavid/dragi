import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { MeshDistortMaterial, GradientTexture } from "@react-three/drei";

import { random } from "lib/utils";

import type { Mesh, InstancedMesh } from "three";
import type { Color } from "lib/types";

interface InstancedBlobsProps {
  colors?: Color[];
}

export default function InstancedBlobs({ colors = [] }: InstancedBlobsProps) {
  const tempObject = new THREE.Object3D();
  const tempColor = new THREE.Color();
  const ref = useRef<InstancedMesh>(null!);

  const x = Array.from({ length: 5 }, () => random(-1, 1, true));
  const y = Array.from({ length: 5 }, () => random(-3, 3, true));

  useFrame((state) => {});

  useEffect(() => {
    if (colors.length > 0) {
      for (let i = 0; i < colors.length; i++) {
        tempObject.position.set(x[i], y[i], 1);
        tempObject.updateMatrix();
        ref.current.setMatrixAt(i, tempObject.matrix);

        tempColor.set(colors[i].hex);
        ref.current.setColorAt(i, tempColor);

        ref.current.instanceColor!.needsUpdate = true;
        ref.current.instanceMatrix.needsUpdate = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors.length]);

  // TODO
  // 1 - get bounding box of the card that the orbs are going to be in
  // 2 - randomize the movement based on the values from above
  // 3 - optionally, rotate the orbs based on the movement
  // 4 - set the

  // useFrame(({ clock }) => {
  //   ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5;
  //   ref.current.position.x = Math.cos(clock.getElapsedTime()) * 0.5;
  //   // ref.current.rotation.x = clock.getElapsedTime();
  //   // ref.current.rotation.y = clock.getElapsedTime();
  //   // ref.current.scale.x = Math.sin(clock.getElapsedTime()) * 0.5 + 1;
  //   // ref.current.scale.y = Math.sin(clock.getElapsedTime()) * 0.5 + 1;
  // });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, 5]}>
      <circleGeometry args={[2, 128, 128]} />

      <MeshDistortMaterial
        distort={random(0.4, 0.7, true)}
        speed={random(1, 3, true)}
        opacity={random(0.5, 0.9, true)}
        transparent={true}
      />
    </instancedMesh>
  );
}

// <MeshDistortMaterial distort={1}>
//   <GradientTexture
//     stops={[0, 0.3, 0.5, 0.9, 1]} // As many stops as you want
//     colors={["red", "orange", "yellow", "green", "blue"]} // Colors need to match the number of stops
//     size={1024} // Size is optional, default = 1024
//   />
// </MeshDistortMaterial>

// function Instances({ count = 100000, temp = new THREE.Object3D() }) {
//   const ref = useRef()
//   useEffect(() => {
//     // Set positions
//     for (let i = 0; i < count; i++) {
//       temp.position.set(Math.random(), Math.random(), Math.random())
//       temp.updateMatrix()
//       ref.current.setMatrixAt(i, temp.matrix)
//     }
//     // Update the instance
//     ref.current.instanceMatrix.needsUpdate = true
//   }, [])
//   return (
//     <instancedMesh ref={ref} args={[null, null, count]}>
//       <boxGeometry />
//       <meshPhongMaterial />
//     </instancedMesh>
//   )
// }
