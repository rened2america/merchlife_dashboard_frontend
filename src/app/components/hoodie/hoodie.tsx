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

export const Hoodie = (props: any) => {
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
  const tags = useProductStore((state) => state.tags);

  const updateOpenToast = useProductStore((state) => state.updateOpenToast);

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
        tags,
        groupId,
        type: "Hoodie",
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
            materials.Knit_Fleece_Terry_FRONT_2650.color,
            new THREE.Color(DEFAULT_COLORS.white),
            0.2,
            delta
          );
          if (
            colorsMatch(
              materials.Knit_Fleece_Terry_FRONT_2650.color,
              DEFAULT_COLORS.white
            )
          ) {
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
            materials.Knit_Fleece_Terry_FRONT_2650.color,
            new THREE.Color(DEFAULT_COLORS.beige),
            0.2,
            delta
          );
          if (
            colorsMatch(
              materials.Knit_Fleece_Terry_FRONT_2650.color,
              DEFAULT_COLORS.beige
            )
          ) {
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ beige: base64 });
            updateSaveStep(2);
          }
          break;
        case 2:
          // Change to red color
          updateColor(DEFAULT_COLORS.red);
          easing.dampC(
            materials.Knit_Fleece_Terry_FRONT_2650.color,
            new THREE.Color(DEFAULT_COLORS.red),
            0.2,
            delta
          );
          if (
            colorsMatch(
              materials.Knit_Fleece_Terry_FRONT_2650.color,
              DEFAULT_COLORS.red
            )
          ) {
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ red: base64 });
            updateSaveStep(3);
          }
          break;
        case 3:
          // Change to blue color
          updateColor(DEFAULT_COLORS.blue);
          easing.dampC(
            materials.Knit_Fleece_Terry_FRONT_2650.color,
            new THREE.Color(DEFAULT_COLORS.blue),
            0.2,
            delta
          );
          if (
            colorsMatch(
              materials.Knit_Fleece_Terry_FRONT_2650.color,
              DEFAULT_COLORS.blue
            )
          ) {
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ blue: base64 });
            updateSaveStep(4);
          }
          break;
        case 4:
          // Change to black color
          updateColor(DEFAULT_COLORS.black);
          easing.dampC(
            materials.Knit_Fleece_Terry_FRONT_2650.color,
            new THREE.Color(DEFAULT_COLORS.black),
            0.2,
            delta
          );
          if (
            colorsMatch(
              materials.Knit_Fleece_Terry_FRONT_2650.color,
              DEFAULT_COLORS.black
            )
          ) {
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
        materials.Knit_Fleece_Terry_FRONT_2650.color,
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

  // Define the area boundaries
  const AREA_X_MIN = -0.14;
  const AREA_X_MAX = 0.14;
  const AREA_Y_MIN = -0.55;
  const AREA_Y_MAX = -0.02;

  // Adjusted functions
  const minAndMaxX = (x: number, scale: number) => {
    const halfImageWidth = scale / 2;
    const xMin = AREA_X_MIN + halfImageWidth;
    const xMax = AREA_X_MAX - halfImageWidth;

    if (x > xMax) return xMax;
    if (x < xMin) return xMin;
    return x;
  };

  const minAndMaxY = (y: number, scale: number) => {
    const halfImageHeight = scale / 2;
    const yMin = AREA_Y_MIN + halfImageHeight;
    const yMax = AREA_Y_MAX - halfImageHeight;

    if (y > yMax) return yMax;
    if (y < yMin) return yMin;
    return y;
  };

  // @ts-ignore
  const { nodes, materials } = useGLTF("/hoodie.glb");

  return (
    <group position={[0, -1.1, 0]} {...props} dispose={null} scale={0.83}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_1.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_2.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_3.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_4.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_5.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_6.geometry}
        material={materials.Interlining_Acetate_Lining_FRONT_2641}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_7.geometry}
        material={materials.Interlining_Acetate_Lining_FRONT_2641}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_8.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_9.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_10.geometry}
        material={materials.Interlining_Acetate_Lining_FRONT_2641}
      ></mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_11.geometry}
        material={materials.Interlining_Acetate_Lining_FRONT_2641}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_12.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_13.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_14.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_15.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_16.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_17.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_18.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      >
        {save ? null : (
          <group position={[0, 1.5, 0.2]}>
            <PivotControls
              scale={0.2}
              activeAxes={[true, true, false]}
              onDrag={(local) => {
                const newposition = new THREE.Vector3();
                const tempScale = new THREE.Vector3();
                const quaternion = new THREE.Quaternion();
                local.decompose(newposition, quaternion, tempScale);
                const rotation = new THREE.Euler().setFromQuaternion(quaternion);

                const currentScale = useProductStore.getState().scale;

                updatePosition({
                  x: minAndMaxX(newposition.x, currentScale),
                  y: minAndMaxY(newposition.y, currentScale),
                  z: newposition.z + 0.1,
                });
                updateAngle(rotation.z);
              }}
            />
          </group>
        )}

        <Decal
          position={[position.x, position.y + 1.5, position.z + -0.01]}
          rotation={[0, 0, angle]}
          scale={scale}
          map={useTexture(image)}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_19.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_20.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_21.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_22.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_23.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_24.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloth_mesh_25.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_2650}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_16332_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_16332_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_16497_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_16497_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_16785_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_16785_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_16862_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_16862_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17016_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17016_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17170_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17170_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17414_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17414_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17498_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17498_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17636_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17636_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17774_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17774_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17829_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17829_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17950_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_17950_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_18071_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_18071_mesh_1.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_18123_mesh.geometry}
        material={materials.Material2839}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BindedTrim_18123_mesh_1.geometry}
        material={materials.Material2839}
      />
    </group>
  );

  return (
    <>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        // geometry={nodes.Cloth_mesh_4.geometry}
        material={materials["lambert1"]}
        // material={materials["Knit_Fleece_Terry_FRONT_2650"]}
        {...props}
        material-aoMapIntensity={1}
        dispose={null}
      >
        {save ? null : (
          <group position={[0, 0, 0.5]}>
            <PivotControls
              scale={0.2}
              activeAxes={[true, true, false]}
              onDrag={(local) => {
                const minAndMaxX = (x: number) => {
                  if (x > 0.1123051291365908) return 0.08958316665788457;
                  if (x < -0.0955177962853023) return -0.0955177962853023;
                  return x;
                };

                const minAndMaxY = (y: number) => {
                  if (y > 0.12393409500680214) return 0.12393409500680214;
                  if (y < -0.2649047726189107) return -0.2649047726189107;
                  return y;
                };
                const newposition = new THREE.Vector3();
                const scale = new THREE.Vector3();
                const quaternion = new THREE.Quaternion();
                local.decompose(newposition, quaternion, scale);
                const rotation = new THREE.Euler().setFromQuaternion(
                  quaternion
                );

                updatePosition({
                  x: minAndMaxX(newposition.x),
                  y: minAndMaxY(newposition.y),
                  z: newposition.z + 0.1,
                });
                updateAngle(rotation.z);
              }}
            />
          </group>
        )}

        <Decal
          position={[position.x, position.y, position.z]}
          rotation={[0, 0, angle]}
          scale={scale}
          map={useTexture(image)}
        />
      </mesh>
    </>
  );
};
