"use client";
import { Hoddie } from "@/app/components/hoodie/hoodie";
import { Mug } from "@/app/components/mug/mug";
import { Object3D } from "@/app/components/shirt/shirt";
import { Sweatshirt } from "@/app/components/sweatshirt/sweatshirt";
import { NewHoodie } from "@/app/components/newHoodie/newHoodie";
import { useProductStore } from "@/store/productStore";
import {
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const Model = () => {
  const selectModel = useProductStore((state) => state.selectModel);
  console.log(selectModel);
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
      {selectModel === "Shirt" ? (
        <Object3D scale={2} position={[0, 0, 0]} />
      ) : selectModel === "Hoodie" ? (
        <NewHoodie />
      ) : selectModel == "Sweatshirt" ? (
        <Sweatshirt />
      ) : (
        <Mug />
      )}
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