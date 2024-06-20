"use client";

import * as THREE from "three";
import { useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  OrbitControls,
  PivotControls,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
  Html,
} from "@react-three/drei";
import { useControls, button } from "leva";
// import { useProduct } from "./useProduct";
import AWS from "aws-sdk";
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

export const Sweatshirt = (props: any) => {
  const gl = useThree((state) => state.gl);
  const [pos, setXYZ] = useState([0, 0, 0.1]);
  const [rot, setRot] = useState([0, 0, 0]);
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
  const openToast = useProductStore((state) => state.openToast);
  const tags = useProductStore((state) => state.tags);

  const transitionProduct = useProductStore((state) => state.transitionProduct);

  const updateTransitionProduct = useProductStore(
    (state) => state.updateTransitionProduct
  );

  const updateResetProductColor = useProductStore(
    (state) => state.updateResetProductColor
  );
  const name = useProductStore((state) => state.name);
  const price = useProductStore((state) => state.price);
  const resetProductColor = useProductStore((state) => state.resetProductColor);

  useEffect(
    () => console.log("transitionProduct: ", transitionProduct),
    [transitionProduct]
  );
  useEffect(() => console.log("openToast: ", openToast), [openToast]);
  useEffect(() => {
    if (isSuccess) {
      updateTransitionProduct("saved");
      const closeToast = setTimeout(() => {
        updateOpenToast(false);
      }, 5000);

      return () => {
        clearInterval(closeToast);
      };
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log("imagesProduct.white.length", imagesProduct.white.length);
    console.log("imagesProduct.beige.length", imagesProduct.beige.length);
    console.log("imagesProduct.red.length", imagesProduct.red.length);
    console.log("imagesProduct.blue.length", imagesProduct.blue.length);
    console.log("imagesProduct.black.length", imagesProduct.black.length);

    if (
      imagesProduct.white.length > 0 &&
      imagesProduct.beige.length > 0 &&
      imagesProduct.red.length > 0 &&
      imagesProduct.blue.length > 0 &&
      imagesProduct.black.length > 0
    ) {
      console.log("Creando Producto");
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
        type: "Sweatshirt",
        tags,
        groupId,
      });
      updateTransitionProduct("saving");

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
      if (resetProductColor) {
        updateColor(DEFAULT_COLORS.white);
        easing.dampC(
          materials.Knit_Cotton_Jersey_FRONT_2709.color,
          DEFAULT_COLORS.white,
          0,
          delta
        );
        updateResetProductColor(false);
      }
      if (
        materials.Knit_Cotton_Jersey_FRONT_2709.color.b === 1 &&
        materials.Knit_Cotton_Jersey_FRONT_2709.color.g ===
          0.9386857284565036 &&
        materials.Knit_Cotton_Jersey_FRONT_2709.color.r === 0.8713671191959567
      ) {
        updateOpenToast(true);
        updateTransitionProduct("snapshots");
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ white: base64 });
        updateColor(DEFAULT_COLORS.beige);
      }
      if (
        materials.Knit_Cotton_Jersey_FRONT_2709.color.b === 0.407240211891531 &&
        materials.Knit_Cotton_Jersey_FRONT_2709.color.g === 0.783537791521566 &&
        materials.Knit_Cotton_Jersey_FRONT_2709.color.r === 0.8962693533719567
      ) {
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ beige: base64 });
        updateColor(DEFAULT_COLORS.red);
      }
      if (
        materials.Knit_Cotton_Jersey_FRONT_2709.color.b === 0 &&
        materials.Knit_Cotton_Jersey_FRONT_2709.color.g === 0 &&
        materials.Knit_Cotton_Jersey_FRONT_2709.color.r === 1
      ) {
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ red: base64 });
        updateColor(DEFAULT_COLORS.blue);
      }

      if (
        materials.Knit_Cotton_Jersey_FRONT_2709.color.b ===
          0.7529422167708612 &&
        materials.Knit_Cotton_Jersey_FRONT_2709.color.g ===
          0.1412632911304446 &&
        materials.Knit_Cotton_Jersey_FRONT_2709.color.r === 0.05286064701616472
      ) {
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ blue: base64 });
        updateColor(DEFAULT_COLORS.black);
      }
      if (
        materials.Knit_Cotton_Jersey_FRONT_2709.color.b ===
          0.030713443727452196 &&
        materials.Knit_Cotton_Jersey_FRONT_2709.color.g ===
          0.030713443727452196 &&
        materials.Knit_Cotton_Jersey_FRONT_2709.color.r === 0.030713443727452196
      ) {
        console.log("black");
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ black: base64 });
        updateSave(false);
        updateResetProductColor(true);
      }
    }

    easing.dampC(
      materials.Knit_Cotton_Jersey_FRONT_2709.color,
      color,
      0.2,
      delta
    );
    easing.dampC(materials.Rib_2X2_468gsm_FRONT_2720.color, color, 0.2, delta);
  });

  // @ts-ignore
  const { nodes, materials } = useGLTF("/Crew-neck Sweatshirt v1_0.glb");
  return (
    <group position={[0, -1.3, 0]} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258637.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258637_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258637_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258638.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258638_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258638_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220259.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      >
        {save ? null : (
          <group position={[0, 1.4, 0.1]}>
            <PivotControls
              scale={0.2}
              activeAxes={[true, true, false]}
              onDrag={(local) => {
                const minAndMaxX = (x: number) => {
                  if (x > 0.07651810371230058) return 0.07651810371230058;
                  if (x < -0.08493404078529548) return -0.08493404078529548;
                  return x;
                };

                const minAndMaxY = (y: number) => {
                  if (y > 0.08504358249825411) return 0.08504358249825411;
                  if (y < -0.2787565081200952) return -0.2787565081200952;
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
          position={[position.x, position.y + 1.4, position.z - 0.045]}
          rotation={[0, 0, angle]}
          scale={scale}
          map={useTexture(image)}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220259_1.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220259_2.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220260.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220260_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220260_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264068.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264068_1.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264068_2.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264069.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264069_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264069_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14631.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14631_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14631_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14632.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14632_1.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14632_2.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14633.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14633_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14633_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14634.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14634_1.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14634_2.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
    </group>
  );
};
