import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 40, position: [0, 0, 60], near: 10, far: 150 }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 0, 5]} />

      {children}

      <Preload all />
    </Canvas>
  );
}
