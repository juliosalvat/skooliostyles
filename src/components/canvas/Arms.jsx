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
      <hemisphereLight intensity={0.1} groundColor="black" />

      {/* Spotlight Above */}
      <spotLight
        position={[0, 50, 0]} // Above the model
        angle={Math.PI / 6} // Adjust cone angle
        penumbra={1}
        intensity={0.1}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Spotlight Below */}
      <spotLight
        position={[0, -50, 0]} // Below the model
        angle={Math.PI / 6} // Adjust cone angle
        penumbra={1}
        intensity={0.3}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Spotlight in Front */}
      <spotLight
        position={[0, 0, 50]} // In front of the model
        angle={Math.PI / 6} // Adjust cone angle
        penumbra={1}
        intensity={0.3}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Spotlight on the Left */}
      <spotLight
        position={[-50, 0, 0]} // To the left of the model
        angle={Math.PI / 6} // Adjust cone angle
        penumbra={1}
        intensity={0.1}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Spotlight on the Right */}
      <spotLight
        position={[50, 0, 0]} // To the right of the model
        angle={Math.PI / 6} // Adjust cone angle
        penumbra={1}
        intensity={0.1}
        castShadow
        shadow-mapSize={1024}
      />

      <pointLight intensity={0.2} />
      <primitive
        object={scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, Math.PI / 2.8, -0.1]} // Rotate 90 degrees on the Y-axis
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
