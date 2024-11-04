"use client";

import * as THREE from "three";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  PivotControls,
  Decal,
} from "@react-three/drei";
import { useProductStore } from "@/store/productStore";
import { easing } from "maath";
import { useProduct } from "../shirt/useProduct";
//@ts-nocheck

const DEFAULT_COLORS = {
  white: "#f0f8ff",
  beige: "#F3E5AB",
  red: "#FF0000",
  blue: "#4169e1",
  black: "#313131",
};

export const NewHoodie = (props: any) => {
  const gl = useThree((state) => state.gl);
  const position = useProductStore((state) => {
    return { x: state.x, y: state.y, z: state.z };
  });
  const scale = useProductStore((state) => state.scale);
  const angle = useProductStore((state) => state.angle);
  const updatePosition = useProductStore((state) => state.updatePosition);
  const updateAngle = useProductStore((state) => state.updateAngle);
  const image = useProductStore((state) => state.imgLogo);
  const image64base = useProductStore((state) => state.imgBase64Logo);
  const color = useProductStore((state) => state.color);
  const updateColor = useProductStore((state) => state.updateColor);
  const { mutate: createProduct, isLoading, isSuccess } = useProduct();
  const save = useProductStore((state) => state.save);
  const updateSave = useProductStore((state) => state.updateSave);
  const addImageProduct = useProductStore((state) => state.addNewImgProduct);
  const imagesProduct = useProductStore((state) => state.imgProduct);
  const colorsSelected = useProductStore((state) => state.colorsSelected);
  const subtitle = useProductStore((state) => state.subtitle);
  const description = useProductStore((state) => state.description);
  const groupId = useProductStore((state) => state.groupId);

  const updateOpenToast = useProductStore((state) => state.updateOpenToast);
  const tags = useProductStore((state) => state.tags);

  const updateTransitionProduct = useProductStore(
    (state) => state.updateTransitionProduct
  );

  const updateResetProductColor = useProductStore(
    (state) => state.updateResetProductColor
  );
  const name = useProductStore((state) => state.name);
  const price = useProductStore((state) => state.price);
  const resetProductColor = useProductStore((state) => state.resetProductColor);
  const saveStep = useProductStore((state) => state.saveStep);
  const updateSaveStep = useProductStore((state) => state.updateSaveStep);
  const [userSelectedColor, setUserSelectedColor] = useState(color);

  // Update userSelectedColor when color changes via eye button
  useEffect(() => {
    if (!save) {
      setUserSelectedColor(color);
    }
  }, [color, save]);

  useEffect(() => {
    if (isSuccess) {
      updateTransitionProduct("saved");
      const closeToast = setTimeout(() => {
        updateOpenToast(false);
      }, 5000);

      return () => {
        clearTimeout(closeToast);
      };
    }
  }, [isSuccess]);

  useEffect(() => {
    if (
      imagesProduct.white.length > 0 &&
      imagesProduct.beige.length > 0 &&
      imagesProduct.red.length > 0 &&
      imagesProduct.blue.length > 0 &&
      imagesProduct.black.length > 0
    ) {
      console.log("Creating Product");
      console.log(imagesProduct);
      //@ts-ignore
      createProduct({
        imgLogo: image64base,
        imgListProduct: imagesProduct,
        colorsSelected,
        angle,
        x: position.x,
        y: position.y,
        scale,
        name,
        subtitle,
        price,
        description,
        type: "Hoodie",
        tags,
        groupId,
      });
      updateTransitionProduct("saving");

      // Reset imagesProduct
      addImageProduct({
        white: "",
        beige: "",
        red: "",
        blue: "",
        black: "",
      });
    }
  }, [
    imagesProduct.white,
    imagesProduct.beige,
    imagesProduct.red,
    imagesProduct.blue,
    imagesProduct.black,
  ]);

  useFrame((state, delta) => {
    if (save) {
      switch (saveStep) {
        case 0:
          // Reset to white color
          updateColor(DEFAULT_COLORS.white);
          easing.dampC(
            materials.mat0.color,
            new THREE.Color(DEFAULT_COLORS.white),
            0.2,
            delta
          );
          if (colorsMatch(materials.mat0.color, DEFAULT_COLORS.white)) {
            updateOpenToast(true);
            updateTransitionProduct("snapshots");
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ white: base64 });
            updateSaveStep(1); // Proceed to next step
          }
          break;
        case 1:
          // Change to beige color
          updateColor(DEFAULT_COLORS.beige);
          easing.dampC(
            materials.mat0.color,
            new THREE.Color(DEFAULT_COLORS.beige),
            0.2,
            delta
          );
          if (colorsMatch(materials.mat0.color, DEFAULT_COLORS.beige)) {
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ beige: base64 });
            updateSaveStep(2);
          }
          break;
        case 2:
          // Change to red color
          updateColor(DEFAULT_COLORS.red);
          easing.dampC(
            materials.mat0.color,
            new THREE.Color(DEFAULT_COLORS.red),
            0.2,
            delta
          );
          if (colorsMatch(materials.mat0.color, DEFAULT_COLORS.red)) {
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ red: base64 });
            updateSaveStep(3);
          }
          break;
        case 3:
          // Change to blue color
          updateColor(DEFAULT_COLORS.blue);
          easing.dampC(
            materials.mat0.color,
            new THREE.Color(DEFAULT_COLORS.blue),
            0.2,
            delta
          );
          if (colorsMatch(materials.mat0.color, DEFAULT_COLORS.blue)) {
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ blue: base64 });
            updateSaveStep(4);
          }
          break;
        case 4:
          // Change to black color
          updateColor(DEFAULT_COLORS.black);
          easing.dampC(
            materials.mat0.color,
            new THREE.Color(DEFAULT_COLORS.black),
            0.2,
            delta
          );
          if (colorsMatch(materials.mat0.color, DEFAULT_COLORS.black)) {
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ black: base64 });
            updateSaveStep(5);
          }
          break;
        case 5:
          // All steps completed
          updateSave(false);
          updateResetProductColor(true);
          updateSaveStep(0); // Reset for next save
          // Reset to user-selected color
          updateColor(userSelectedColor);
          break;
        default:
          break;
      }
    } else {
      // Apply the user's selected color when not saving
      easing.dampC(
        materials.mat0.color,
        new THREE.Color(color),
        0.2,
        delta
      );
    }
  });

  // Utility function to compare colors with tolerance
  const colorsMatch = (color1: THREE.Color, color2Hex: string) => {
    const color2 = new THREE.Color(color2Hex);
    const tolerance = 0.01;
    return (
      Math.abs(color1.r - color2.r) < tolerance &&
      Math.abs(color1.g - color2.g) < tolerance &&
      Math.abs(color1.b - color2.b) < tolerance
    );
  };

  // @ts-ignore
  const { nodes, materials } = useGLTF("/newhoodie.glb");
  
  useEffect(() => {
    updatePosition({ x: 0, y: 0, z: 0 });
  }, [updatePosition]);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.imagetostl_mesh0.geometry}
        material={materials.mat0}
        scale={[0.01, 0.01, 0.01]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -1.2, 0]}
      >
        {save ? null : (
          <group position={[0, 20, -120]} rotation={[0, 0, 0]}>
            <PivotControls
              scale={10}
              activeAxes={[true, false, true]}
              onDrag={(local) => {
                const minAndMaxX = (x: number) => {
                  if (x > 8.237275144301767) return 8.237275144301767;
                  if (x < -9.64203076768904) return -9.64203076768904;
                  return x;
                };

                const minAndMaxY = (y: number) => {
                  if (y > 4.89091315687232) return 4.89091315687232;
                  if (y < -16.820017173725528) return -16.820017173725528;
                  return y;
                };
                const newposition = new THREE.Vector3();
                const scaleVec = new THREE.Vector3();
                const quaternion = new THREE.Quaternion();
                local.decompose(newposition, quaternion, scaleVec);
                const rotation = new THREE.Euler().setFromQuaternion(
                  quaternion
                );
                updatePosition({
                  x: minAndMaxX(newposition.x),
                  y: minAndMaxY(newposition.z),
                  z: newposition.y,
                });
                updateAngle(rotation.y);
              }}
            />
          </group>
        )}

        <Decal
          position={[position.x, position.z + 9, position.y - 120]}
          rotation={[-Math.PI / 2, 0, angle]}
          scale={scale * 55}
          map={useTexture(image)}
        />
      </mesh>
    </group>
  );
};
