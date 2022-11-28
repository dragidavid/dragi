import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, GradientTexture } from "@react-three/drei";

import type { Mesh } from "three";

export default function Orb() {
  const myMesh = useRef<Mesh>(null!);

  // TODO
  // 1 - get bounding box of the card that the orbs are going to be in
  // 2 - randomize the movement based on the values from above
  // 3 - optionally, rotate the orbs based on the movement
  // 4 - set the

  // useFrame(({ clock }) => {
  //   myMesh.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5;
  //   myMesh.current.position.x = Math.cos(clock.getElapsedTime()) * 0.5;
  //   // myMesh.current.rotation.x = clock.getElapsedTime();
  //   // myMesh.current.rotation.y = clock.getElapsedTime();
  //   // myMesh.current.scale.x = Math.sin(clock.getElapsedTime()) * 0.5 + 1;
  //   // myMesh.current.scale.y = Math.sin(clock.getElapsedTime()) * 0.5 + 1;
  // });

  return (
    <mesh ref={myMesh} position={[1, 1, 1]}>
      <circleGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial distort={0.8} color="red" />
    </mesh>
  );
}

// <MeshDistortMaterial distort={1}>
//   <GradientTexture
//     stops={[0, 0.3, 0.5, 0.9, 1]} // As many stops as you want
//     colors={["red", "orange", "yellow", "green", "blue"]} // Colors need to match the number of stops
//     size={1024} // Size is optional, default = 1024
//   />
// </MeshDistortMaterial>
