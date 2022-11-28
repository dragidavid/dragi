import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Preload } from "@react-three/drei";

interface SceneProps {
  children: React.ReactNode;
}

export default function Scene({ children }: SceneProps) {
  return (
    <Canvas>
      <Perf />
      <ambientLight intensity={1} />
      {children}
      <Preload all />
    </Canvas>
  );
}
