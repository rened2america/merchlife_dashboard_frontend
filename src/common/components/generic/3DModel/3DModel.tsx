"use client";
import { Mug } from "@/app/components/mug/mug";
import { TShirt } from "@/app/components/shirt/shirt";
import { Sweatshirt } from "@/app/components/sweatshirt/sweatshirt";
// import { Hoodie } from "@/app/components/hoodie/hoodie";
import { useProductStore } from "@/store/productStore";
import {
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  Html,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { NewHoodie } from "@/app/components/newHoodie/newHoodie";

export const Model = () => {
  const selectModel = useProductStore((state) => state.selectModel);
  const Loading = () => {
    return (
      <Html center>
        <SyncLoader />
      </Html>
    );
  };
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      orthographic
      camera={{
        position: [0, 0, 2.5],
        fov: 25,
        zoom: 500,
      }}
      style={{ background: "#f2f4f7" ,
        borderRadius: "32px "}}
      className="responsive-canvas"
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[10, 10, 10]} />
      <Environment preset="city" />
      <Suspense fallback={<Loading />}>
        {selectModel === "Shirt" ? (
          <TShirt />
        ) : selectModel === "Hoodie" ? (
          <NewHoodie />
        ) : selectModel == "Sweatshirt" ? (
          <Sweatshirt />
        ) : (
          <Mug />
        )}
      </Suspense>
      <AccumulativeShadows
        temporal
        frames={100}
        alphaTest={0.95}
        opacity={1}
        scale={25}
        position={[0, -1, 0]}
      >
        <RandomizedLight
          amount={8}
          radius={10}
          ambient={0.7}
          intensity={1}
          position={[10, 10, -5]}
          bias={0.01}
          size={10}
        />
      </AccumulativeShadows>
    </Canvas>
  );
};

// CSS (add this to your stylesheet or in a style tag in your component)
<style jsx>{`
  .responsive-container {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 16px;
  }

  .responsive-canvas {
    width: 100%;
    height: 100%;
    
  background: #f2f4f7 !important;
  borderRadius: 32px !important;
  }

  @media (max-width: 768px) {
    .responsive-container {
      padding: 8px;
    }

    .responsive-canvas {
      width: 100%;
      height: 400px; /* Adjust height as needed for smaller screens */
    }
  }

  @media (max-width: 480px) {
    .responsive-canvas {
      height: 300px; /* Further adjust height for very small screens */
    }
  }
`}</style>