import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { OrbitControls, Preload, Environment } from "@react-three/drei";

interface SceneProps {
  children: React.ReactNode;
}

export default function Scene({ children }: SceneProps) {
  return (
    <Canvas
      camera={{ fov: 40, position: [0, 0, 60], near: 10, far: 150 }}
      dpr={[1, 2]}
    >
      <Perf />
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 0, 5]} />
      {children}
      <Environment preset="night" />
      <Preload all />
    </Canvas>
  );
}
