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
import { useProduct } from "./useProduct";
import AWS from "aws-sdk";
import { useProductStore } from "@/store/productStore";
import { easing } from "maath";
//@ts-nocheck

const DEFAULT_COLORS = {
  white: "#f0f8ff",
  beige: "#F3E5AB",
  red: "#FF0000",
  blue: "#4169e1",
  black: "#313131",
};

export const Object3D = (props: any) => {
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
        description,
        type: "Shirt",
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
        easing.dampC(materials.lambert1.color, DEFAULT_COLORS.white, 0, delta);
        updateResetProductColor(false);
      }
      if (
        materials.lambert1.color.b === 1 &&
        materials.lambert1.color.g === 0.9386857284565036 &&
        materials.lambert1.color.r === 0.8713671191959567
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
        materials.lambert1.color.b === 0.407240211891531 &&
        materials.lambert1.color.g === 0.783537791521566 &&
        materials.lambert1.color.r === 0.8962693533719567
      ) {
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ beige: base64 });
        updateColor(DEFAULT_COLORS.red);
      }
      if (
        materials.lambert1.color.b === 0 &&
        materials.lambert1.color.g === 0 &&
        materials.lambert1.color.r === 1
      ) {
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ red: base64 });
        updateColor(DEFAULT_COLORS.blue);
      }

      if (
        materials.lambert1.color.b === 0.7529422167708612 &&
        materials.lambert1.color.g === 0.1412632911304446 &&
        materials.lambert1.color.r === 0.05286064701616472
      ) {
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ blue: base64 });
        updateColor(DEFAULT_COLORS.black);
      }
      if (
        materials.lambert1.color.b === 0.030713443727452196 &&
        materials.lambert1.color.g === 0.030713443727452196 &&
        materials.lambert1.color.r === 0.030713443727452196
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

    easing.dampC(materials.lambert1.color, color, 0.2, delta);
  });

  // @ts-ignore
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  // const { nodes, materials, scene } = useGLTF("/hoodie.glb");
  // const { debug, scale, name } = useControls({
  //   debug: false,
  //   name: {
  //     value: "",
  //   },
  //   image: { image: "/1200px-Starbucks_Logo_ab_2011.svg.png" },
  //   scale: { value: 0.2, min: 0.12, max: 0.4 },
  //   save: button(async () => {
  //     const link = document.createElement("a");
  //     link.setAttribute("download", "canvas.png");
  //     console.log("Nombre", name);
  //     console.log(image);
  //     const imgLogo = await blobUrlToBase64(image);
  //     console.log(imgLogo);
  //     //@ts-ignore
  //     // createProduct({
  //     //   name,
  //     //   imgProduct: gl.domElement.toDataURL("image/png"),
  //     //   imgLogo: imgLogo,
  //     // });
  //   }),
  // });

  // Ejemplo de uso
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
        scale={1.5}
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
