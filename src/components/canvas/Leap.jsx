import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";
import CanvasLoader from "../Loader";

const LeapModel = ({ isMobile }) => {
  const { scene } = useGLTF("./arms/arms.gltf", undefined, (loader) => {
    const dracoLoader = new DRACOLoader();
    loader.setDRACOLoader(dracoLoader);
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.225} groundColor="black" />

      {/* Spotlight Above */}
      <spotLight
        position={[10, 20, 10]} // Above and to the side
        angle={Math.PI / 4} // Wider cone angle
        penumbra={1}
        intensity={0.375}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Spotlight Behind */}
      <spotLight
        position={[0, 10, -25]} // Behind the model
        angle={Math.PI / 3} // Wider cone angle
        penumbra={1}
        intensity={0.45}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Spotlight in Front */}
      <spotLight
        position={[0, 5, 25]} // In front, slightly above
        angle={Math.PI / 4} // Adjust cone angle
        penumbra={1}
        intensity={0.45}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Spotlight on the Left */}
      <spotLight
        position={[-20, 10, 10]} // To the left, above and forward
        angle={Math.PI / 4} // Adjust cone angle
        penumbra={1}
        intensity={0.3}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Spotlight on the Right */}
      <spotLight
        position={[20, -5, 15]} // To the right, below and forward
        angle={Math.PI / 4} // Adjust cone angle
        penumbra={1}
        intensity={0.3}
        castShadow
        shadow-mapSize={1024}
      />

      <pointLight intensity={0.3} />
      <primitive
        object={scene}
        scale={isMobile ? 8 : 11}
        position={[0, -0.7, 0]}
        rotation={[0, 0, 0]} // Centered rotation
      />
    </mesh>
  );
};

const MemoizedLeapModel = React.memo(LeapModel);

const LeapCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [30, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <MemoizedLeapModel isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default LeapCanvas;
