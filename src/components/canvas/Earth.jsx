// import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
// import { DRACOLoader } from "three/addons/loaders/DRACOLoader";
// import CanvasLoader from "../Loader";

// const EarthModel = () => {
//   const { scene } = useGLTF("./gordie/gordie.gltf", undefined, (loader) => {
//     const dracoLoader = new DRACOLoader();
//     loader.setDRACOLoader(dracoLoader);
//   });

//   return <primitive object={scene} scale={1.6} position-y={0} rotation-y={0} />;
// };

// const EarthCanvas = () => {
//   return (
//     <Canvas
//       frameloop="demand"
//       dpr={[1, 2]}
//       gl={{ preserveDrawingBuffer: true }}
//       camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
//       shadows
//     >
//       <OrbitControls
//         autoRotate
//         enableZoom={false}
//         maxPolarAngle={Math.PI / 2}
//         minPolarAngle={Math.PI / 2}
//       />
//       <Suspense fallback={<CanvasLoader />}>
//         <EarthModel />
//       </Suspense>
//       <Preload all />
//     </Canvas>
//   );
// };

// export default EarthCanvas;

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";
import CanvasLoader from "../Loader";

const EarthModel = () => {
  const { scene } = useGLTF("./gordie/gordie.gltf", undefined, (loader) => {
    const dracoLoader = new DRACOLoader();
    loader.setDRACOLoader(dracoLoader);
  });

  return <primitive object={scene} scale={0.8} position-y={1} rotation-y={0} />;
};

const EarthCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      shadows
    >
      {/* Orbit controls for interaction */}
      <OrbitControls
        autoRotate
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      {/* Add lights to the scene */}
      {/* Ambient Light for overall illumination */}
      <ambientLight intensity={0.5} />

      {/* Directional Light from above */}
      <directionalLight
        position={[0, 10, 5]} // Position above the character
        intensity={1} // Brightness
        castShadow
      />

      {/* Directional Light from the side */}
      <directionalLight
        position={[-10, 5, -5]} // Position on the left side
        intensity={0.7}
        castShadow
      />

      {/* Add the model */}
      <Suspense fallback={<CanvasLoader />}>
        <EarthModel />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
