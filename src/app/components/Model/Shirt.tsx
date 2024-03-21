import React from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useProductStore } from "@/store/productStore";

function Shirt() {
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const color = useProductStore((state) => state.color);

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, color, 0.25, delta)
  );

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      ></mesh>
    </group>
  );
}

export default Shirt;
