import { Canvas } from "@react-three/fiber";
import { Environment, Preload, Lightformer } from "@react-three/drei";
import { EffectComposer, N8AO, Bloom } from "@react-three/postprocessing";

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 50, position: [0, 0, 50], near: 1, far: 200 }}
    >
      <ambientLight intensity={1.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
      />

      {children}

      <Preload all />

      <EffectComposer multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={2} intensity={2} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} opacity={10} />
      </EffectComposer>

      <Environment preset="city">
        <Lightformer
          form="ring"
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={8}
        />
        <Lightformer
          form="circle"
          intensity={1.8}
          rotation-y={Math.PI / 2}
          position={[-5, 1, -1]}
          scale={2}
        />
        <Lightformer
          form="circle"
          intensity={2.2}
          rotation-y={Math.PI / 2}
          position={[-5, -1, -1]}
          scale={4}
        />
        <Lightformer
          form="ring"
          intensity={1.8}
          rotation-y={-Math.PI / 2}
          position={[10, 1, 0]}
          scale={10}
        />
      </Environment>
    </Canvas>
  );
}
