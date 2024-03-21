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

export const Hoddie = (props: any) => {
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

  const updateOpenToast = useProductStore((state) => state.updateOpenToast);
  const openToast = useProductStore((state) => state.openToast);

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
        type: "Hoodie",
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
          materials.Knit_Fleece_Terry_FRONT_2650.color,
          DEFAULT_COLORS.white,
          0,
          delta
        );
        updateResetProductColor(false);
      }
      if (
        materials.Knit_Fleece_Terry_FRONT_2650.color.b === 1 &&
        materials.Knit_Fleece_Terry_FRONT_2650.color.g === 0.9386857284565036 &&
        materials.Knit_Fleece_Terry_FRONT_2650.color.r === 0.8713671191959567
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
        materials.Knit_Fleece_Terry_FRONT_2650.color.b === 0.407240211891531 &&
        materials.Knit_Fleece_Terry_FRONT_2650.color.g === 0.783537791521566 &&
        materials.Knit_Fleece_Terry_FRONT_2650.color.r === 0.8962693533719567
      ) {
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ beige: base64 });
        updateColor(DEFAULT_COLORS.red);
      }
      if (
        materials.Knit_Fleece_Terry_FRONT_2650.color.b === 0 &&
        materials.Knit_Fleece_Terry_FRONT_2650.color.g === 0 &&
        materials.Knit_Fleece_Terry_FRONT_2650.color.r === 1
      ) {
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ red: base64 });
        updateColor(DEFAULT_COLORS.blue);
      }

      if (
        materials.Knit_Fleece_Terry_FRONT_2650.color.b === 0.7529422167708612 &&
        materials.Knit_Fleece_Terry_FRONT_2650.color.g === 0.1412632911304446 &&
        materials.Knit_Fleece_Terry_FRONT_2650.color.r === 0.05286064701616472
      ) {
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ blue: base64 });
        updateColor(DEFAULT_COLORS.black);
      }
      if (
        materials.Knit_Fleece_Terry_FRONT_2650.color.b ===
          0.030713443727452196 &&
        materials.Knit_Fleece_Terry_FRONT_2650.color.g ===
          0.030713443727452196 &&
        materials.Knit_Fleece_Terry_FRONT_2650.color.r === 0.030713443727452196
      ) {
        const base64 = gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        addImageProduct({ black: base64 });
        updateSave(false);
        updateResetProductColor(true);
      }
    }
    easing.dampC(
      materials.Knit_Fleece_Terry_FRONT_2650.color,
      color,
      0.2,
      delta
    );
  });

  // @ts-ignore
  const { nodes, materials } = useGLTF("/hoodie.glb");
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
    <group position={[0, -1.3, 0]} {...props} dispose={null}>
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
              activeAxes={[true, true, true]}
              onDrag={(local) => {
                const minAndMaxX = (x: number) => {
                  if (x > 0.1123051291365908) return 0.08958316665788457;
                  if (x < -0.0955177962853023) return -0.0955177962853023;
                  return x;
                };
                console.log();
                const minAndMaxY = (y: number) => {
                  if (y > -0.07590870849426645) return -0.07590870849426645;
                  if (y < -0.5152771083063961) return -0.5152771083063961;
                  return y;
                };
                const newposition = new THREE.Vector3();
                const scale = new THREE.Vector3();
                const quaternion = new THREE.Quaternion();
                local.decompose(newposition, quaternion, scale);
                console.log(scale);
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
