// "use client";
// import { Cup } from "@/app/components/shirt/shirt";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import {
//   OrbitControls,
//   AccumulativeShadows,
//   RandomizedLight,
//   Environment,
//   Center,
//   useGLTF,
//   useTexture,
//   Decal,
// } from "@react-three/drei";
// import {
//   ReactNode,
//   forwardRef,
//   memo,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { easing } from "maath";
// import * as Label from "@radix-ui/react-label";
// import * as Select from "@radix-ui/react-select";
// import classnames from "classnames";
// import {
//   CheckIcon,
//   ChevronDownIcon,
//   ChevronUpIcon,
// } from "@radix-ui/react-icons";
// import "./product.css";
// import { Button } from "@/components/ui/button";
// import { useDropzone } from "react-dropzone";
// import { useProductStore } from "@/store/productStore";
// import { useProduct } from "@/app/components/shirt/useProduct";
// //@ts-nocheck
// const thumbsContainer = {
//   display: "flex",
//   flexDirection: "row",
//   flexWrap: "wrap",
//   marginTop: 16,
// };

// const thumb = {
//   display: "inline-flex",
//   borderRadius: 2,
//   border: "1px solid #eaeaea",
//   marginBottom: 8,
//   marginRight: 8,
//   width: 50,
//   height: 50,
//   padding: 4,
//   boxSizing: "border-box",
// };

// const thumbInner = {
//   display: "flex",
//   minWidth: 0,
//   overflow: "hidden",
// };

// const img = {
//   display: "block",
//   width: "auto",
//   height: "100%",
// };

// export default function New() {
//   const [files, setFiles] = useState([]);
//   const { mutate: createProduct } = useProduct();

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       "image/*": [],
//     },
//     onDrop: (acceptedFiles) => {
//       setFiles(
//         acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         )
//       );
//     },
//   });
//   const productData = useProductStore((state) => state);
//   const imgListProduct = useProductStore((state) => state.imgProduct);
//   const handleChange = (event) => {
//     // Validamos que el valor ingresado sea un número
//     const valor = parseFloat(event.target.value);
//     if (!isNaN(valor)) {
//       productData.updatePosition({ x: valor.x, y: valor.y, z: valor.z }); // Actualizamos el estado con el nuevo valor numérico
//     }
//   };

//   const handleChangeName = (event) => {
//     const name = event.target.value;
//     productData.updateName(name);
//   };
//   console.log(productData);
//   useEffect(() => {
//     if (files.length > 0) {
//       productData.updateImgLogo(files[0].preview);
//       productData.updateImgBase64Logo(files[0].preview);
//     }
//   }, [files]);
//   useEffect(() => {
//     if (imgListProduct.length > 0) {
//       createProduct({
//         name: productData.name,
//         x: productData.x,
//         y: productData.y,
//         angle: productData.angle,
//         imgListProduct: imgListProduct,
//         imgLogo: productData.imgBase64Logo,
//       });
//     }
//   }, [imgListProduct.length]);
//   const thumbs = files.map((file) => {
//     return (
//       <div style={thumb} key={file.name}>
//         <div style={thumbInner}>
//           <img
//             src={file.preview}
//             style={img}
//             // Revoke data uri after image is loaded
//             onLoad={() => {
//               URL.revokeObjectURL(file.preview);
//             }}
//           />
//         </div>
//       </div>
//     );
//   });

//   useEffect(() => {
//     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
//     return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
//   }, []);

//   const gridStyle = {
//     display: "grid",
//     gridTemplateRows: "30px 30px",
//   };

//   const gridItemStyle = {
//     display: "grid",
//     gridTemplateColumns: "repeat(3,minmax(0,1fr))",
//   };

//   console.log(productData);
//   return (
//     <div
//       style={{
//         display: "grid",
//         gap: "24px",
//         gridTemplateColumns: "200px 1fr 250px",
//         height: "calc(24px - 100vh)",
//       }}
//     >
//       <div
//         style={{
//           display: "grid",
//           gridTemplateRows: "200px 200px 200px",
//         }}
//       >
//         <Canvas
//           style={{
//             borderTopLeftRadius: "20px",
//             borderTopRightRadius: "20px",
//           }}
//           shadows
//           camera={{ position: [0, 0, 2.5], fov: 25 }}
//           gl={{ preserveDrawingBuffer: true }}
//           eventPrefix="client"
//         >
//           <ambientLight intensity={0.5} />
//           <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
//           <CameraRig>
//             <Backdrop />
//             <Center>
//               <Shirt />
//             </Center>
//           </CameraRig>
//         </Canvas>
//         <Canvas
//           shadows
//           camera={{ position: [0, 0, 2.5], fov: 25 }}
//           gl={{ preserveDrawingBuffer: true }}
//           eventPrefix="client"
//         >
//           <ambientLight intensity={0.5} />
//           <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
//           <CameraRig>
//             <Backdrop2 />
//             <Center>
//               <Shirt2 />
//             </Center>
//           </CameraRig>
//         </Canvas>
//         <Canvas
//           style={{
//             borderBottomLeftRadius: "20px",
//             borderBottomRightRadius: "20px",
//           }}
//           shadows
//           camera={{ position: [0, 0, 2.5], fov: 25 }}
//           gl={{ preserveDrawingBuffer: true }}
//           eventPrefix="client"
//         >
//           <ambientLight intensity={0.5} />
//           <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
//           <CameraRig>
//             <Backdrop3 />
//             <Center>
//               <Shirt3 />
//             </Center>
//           </CameraRig>
//         </Canvas>
//       </div>
//       <div>
//         <Canvas
//           gl={{ preserveDrawingBuffer: true }}
//           shadows
//           orthographic
//           camera={{ position: [0, 0, 2.5], fov: 25, zoom: 300 }}
//         >
//           <ambientLight intensity={0.5} />
//           <directionalLight intensity={0.5} position={[10, 10, 10]} />
//           {/* <Cup scale={2} position={[0, 0, 0]} /> */}
//           <AccumulativeShadows
//             temporal
//             frames={100}
//             alphaTest={0.95}
//             opacity={1}
//             scale={25}
//             position={[0, -1, 0]}
//           >
//             <RandomizedLight
//               amount={8}
//               radius={10}
//               ambient={0.7}
//               intensity={1}
//               position={[10, 10, -5]}
//               bias={0.01}
//               size={10}
//             />
//           </AccumulativeShadows>
//           <OrbitControls makeDefault />
//         </Canvas>
//       </div>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateRows: "60px 60px 60px 120px 50px",
//           gap: "12px",
//           padding: "24px",
//         }}
//       >
//         <div
//           style={{
//             display: "grid",
//             gap: "8px",
//           }}
//         >
//           <Label.Root className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//             Name
//           </Label.Root>
//           <input
//             className="Input"
//             type="text"
//             id="name"
//             value={productData.name}
//             onChange={handleChangeName}
//           />
//         </div>
//         <div
//           style={{
//             display: "grid",
//             gap: "8px",
//           }}
//         >
//           <Label.Root className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//             Product
//           </Label.Root>
//           <Select.Root>
//             <Select.Trigger>
//               <Select.Value placeholder="Select a product" />
//               <Select.Icon className="SelectIcon">
//                 <ChevronDownIcon />
//               </Select.Icon>
//             </Select.Trigger>
//             <Select.Portal>
//               <Select.Content className="SelectContent">
//                 <Select.ScrollUpButton className="SelectScrollButton">
//                   <ChevronUpIcon />
//                 </Select.ScrollUpButton>
//                 <Select.Viewport className="SelectViewport">
//                   <Select.Group>
//                     <Select.Label className="SelectLabel">
//                       Products
//                     </Select.Label>
//                     <SelectItem value="shirt">Shirt</SelectItem>
//                     <SelectItem value="mug">Mug</SelectItem>
//                     <SelectItem value="post">Post</SelectItem>
//                   </Select.Group>
//                 </Select.Viewport>
//                 <Select.ScrollDownButton className="SelectScrollButton">
//                   <ChevronDownIcon />
//                 </Select.ScrollDownButton>
//               </Select.Content>
//             </Select.Portal>
//           </Select.Root>
//         </div>
//         {/* <div
//           style={{
//             display: "grid",
//             gap: "8px",
//           }}
//         >
//           <Label.Root className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//             Colors
//           </Label.Root>
//           <Select.Root>
//             <Select.Trigger>
//               <Select.Value placeholder="Select a color" />
//               <Select.Icon className="SelectIcon">
//                 <ChevronDownIcon />
//               </Select.Icon>
//             </Select.Trigger>
//             <Select.Portal>
//               <Select.Content className="SelectContent">
//                 <Select.ScrollUpButton className="SelectScrollButton">
//                   <ChevronUpIcon />
//                 </Select.ScrollUpButton>
//                 <Select.Viewport className="SelectViewport">
//                   <Select.Group>
//                     <Select.Label className="SelectLabel">Colors</Select.Label>
//                     <SelectItem value="white">White</SelectItem>
//                     <SelectItem value="black">Black</SelectItem>
//                     <SelectItem value="red">Red</SelectItem>
//                     <SelectItem value="yellow">Yellow</SelectItem>
//                     <SelectItem value="orange">Orange</SelectItem>
//                   </Select.Group>
//                 </Select.Viewport>
//                 <Select.ScrollDownButton className="SelectScrollButton">
//                   <ChevronDownIcon />
//                 </Select.ScrollDownButton>
//               </Select.Content>
//             </Select.Portal>
//           </Select.Root>
//         </div> */}
//         <div style={gridStyle}>
//           <div style={gridItemStyle}>
//             <div>
//               <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 X
//               </span>
//             </div>
//             <div>
//               <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Y
//               </span>
//             </div>
//             <div>
//               <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 Angle
//               </span>
//             </div>
//           </div>
//           <div style={gridItemStyle}>
//             <div>
//               <input
//                 style={{
//                   width: "60px",
//                 }}
//                 type="number"
//                 id="x"
//                 name="x"
//                 value={productData.x}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <input
//                 style={{
//                   width: "60px",
//                 }}
//                 type="number"
//                 id="y"
//                 name="y"
//                 value={productData.y}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <input
//                 style={{
//                   width: "60px",
//                 }}
//                 type="number"
//                 id="angle"
//                 name="angle"
//                 value={productData.angle}
//                 onChange={handleChange}
//                 step="0.01"
//               />
//             </div>
//           </div>
//         </div>
//         {/* <div style={gridStyle}>
//           <div style={gridItemStyle}>
//             <div>Height</div>
//             <div>Width </div>
//             <div>Scale</div>
//           </div>
//           <div style={gridItemStyle}>
//             <div>
//               <input
//                 style={{
//                   width: "60px",
//                 }}
//                 type="number"
//                 id="height"
//                 name="height"
//               />
//             </div>
//             <div>
//               <input
//                 style={{
//                   width: "60px",
//                 }}
//                 type="number"
//                 id="width"
//                 name="width"
//               />
//             </div>
//             <div>
//               <input
//                 style={{
//                   width: "60px",
//                 }}
//                 type="number"
//                 id="scale"
//                 name="scale"
//               />
//             </div>
//           </div>
//         </div> */}

//         <section className="container">
//           <div {...getRootProps({ className: "dropzone" })}>
//             <input {...getInputProps()} />
//             <Button variant="secondary">Click to select image</Button>
//           </div>
//           <aside style={thumbsContainer}>{thumbs}</aside>
//         </section>
//         <Button onClick={() => productData.updateSave(true)}>Save</Button>
//       </div>
//     </div>
//   );
// }
// const Backdrop = memo<any>(() => {
//   const shadows = useRef();
//   //@ts-ignore
//   useFrame((state, delta) => {
//     easing.dampC(
//       shadows.current.getMesh().material.color,
//       "#80C670",
//       0.25,
//       delta
//     );
//   });
//   //@ts-ignore
//   return (
//     <AccumulativeShadows
//       ref={shadows}
//       temporal
//       frames={60}
//       alphaTest={0.85}
//       scale={10}
//       rotation={[Math.PI / 2, 0, 0]}
//       position={[0, 0, -0.14]}
//     >
//       <RandomizedLight
//         amount={4}
//         radius={9}
//         intensity={0.55}
//         ambient={0.25}
//         position={[5, 5, -10]}
//       />
//       <RandomizedLight
//         amount={4}
//         radius={5}
//         intensity={0.25}
//         ambient={0.55}
//         position={[-5, 5, -9]}
//       />
//     </AccumulativeShadows>
//   );
// });

// const Backdrop2 = memo(() => {
//   const shadows = useRef();

//   const changeColor = () => {
//     if (shadows.current) {
//       const randomColor = "#6266bd"; // Genera un color hexadecimal aleatorio
//       shadows.current.getMesh().material.color.set(randomColor); // Cambia el color del material de la caja
//     }
//   };
//   useFrame((state, delta) => {
//     changeColor();
//   });
//   return (
//     <AccumulativeShadows
//       ref={shadows}
//       temporal
//       frames={60}
//       alphaTest={0.85}
//       scale={10}
//       rotation={[Math.PI / 2, 0, 0]}
//       position={[0, 0, -0.14]}
//     >
//       <RandomizedLight
//         amount={4}
//         radius={9}
//         intensity={0.55}
//         ambient={0.25}
//         position={[5, 5, -10]}
//       />
//       <RandomizedLight
//         amount={4}
//         radius={5}
//         intensity={0.25}
//         ambient={0.55}
//         position={[-5, 5, -9]}
//       />
//     </AccumulativeShadows>
//   );
// });

// const Backdrop3 = memo(() => {
//   const shadows = useRef();

//   const changeColor = () => {
//     if (shadows.current) {
//       const randomColor = "#cf3232"; // Genera un color hexadecimal aleatorio
//       shadows.current.getMesh().material.color.set(randomColor); // Cambia el color del material de la caja
//     }
//   };
//   useFrame((state, delta) => {
//     changeColor();
//   });
//   return (
//     <AccumulativeShadows
//       ref={shadows}
//       temporal
//       frames={60}
//       alphaTest={0.85}
//       scale={10}
//       rotation={[Math.PI / 2, 0, 0]}
//       position={[0, 0, -0.14]}
//     >
//       <RandomizedLight
//         amount={4}
//         radius={9}
//         intensity={0.55}
//         ambient={0.25}
//         position={[5, 5, -10]}
//       />
//       <RandomizedLight
//         amount={4}
//         radius={5}
//         intensity={0.25}
//         ambient={0.55}
//         position={[-5, 5, -9]}
//       />
//     </AccumulativeShadows>
//   );
// });

// function CameraRig({ children }) {
//   const group = useRef();
//   useFrame((state, delta) => {
//     easing.damp3(state.camera.position, [0, 0, 1], 0.5, delta);
//   });
//   return <group ref={group}>{children}</group>;
// }

// function Shirt(props) {
//   const image = useProductStore((state) => state.imgLogo);
//   const gl = useThree((state) => state.gl);
//   const position = useProductStore((state) => {
//     return { x: state.x, y: state.y, z: state.z };
//   });
//   const angle = useProductStore((state) => state.angle);
//   const updateImage = useProductStore((state) => state.updateProduct);
//   const addNewImgProduct = useProductStore((state) => state.addNewImgProduct);
//   const save = useProductStore((state) => state.save);

//   useEffect(() => {
//     if (save) {
//       addNewImgProduct(gl.domElement.toDataURL("image/png"));
//       // updateImage(gl.domElement.toDataURL("image/png"));
//       // console.log(gl.domElement.toDataURL("image/png"));
//     }
//   }, [save]);
//   // @ts-ignore
//   const { nodes, materials } = useGLTF("/shirt_baked.glb");
//   useFrame((state, delta) =>
//     easing.dampC(materials.lambert1.color, "#80C670", 0.25, delta)
//   );
//   console.log("materials.lambert1.color", materials.lambert1.color);
//   return (
//     <mesh
//       castShadow
//       geometry={nodes.T_Shirt_male.geometry}
//       material={materials.lambert1}
//       material-roughness={1}
//       {...props}
//       dispose={null}
//       scale={0.5}
//     >
//       <Decal
//         position={[position.x, position.y, position.z]}
//         rotation={[0, 0, angle]}
//         scale={0.15}
//         map={useTexture(image)}
//       />
//     </mesh>
//   );
// }

// function Shirt2(props) {
//   const image = useProductStore((state) => state.imgLogo);
//   const gl = useThree((state) => state.gl);
//   const position = useProductStore((state) => {
//     return { x: state.x, y: state.y, z: state.z };
//   });
//   const angle = useProductStore((state) => state.angle);

//   const updateImage = useProductStore((state) => state.updateProduct);
//   const addNewImgProduct = useProductStore((state) => state.addNewImgProduct);

//   const save = useProductStore((state) => state.save);

//   useEffect(() => {
//     if (save) {
//       addNewImgProduct(gl.domElement.toDataURL("image/png"));

//       // updateImage(gl.domElement.toDataURL("image/png"));
//       // console.log(gl.domElement.toDataURL("image/png"));
//     }
//   }, [save]);
//   // @ts-ignore
//   const { nodes, materials } = useGLTF("/shirt_baked2.glb");
//   useFrame((state, delta) =>
//     easing.dampC(materials.lambert1.color, "#6266bd", 0.25, delta)
//   );
//   console.log();
//   return (
//     <mesh
//       castShadow
//       geometry={nodes.T_Shirt_male.geometry}
//       material={materials.lambert1}
//       material-roughness={1}
//       {...props}
//       dispose={null}
//       scale={0.5}
//     >
//       <Decal
//         position={[position.x, position.y, position.z]}
//         rotation={[0, 0, angle]}
//         scale={0.15}
//         map={useTexture(image)}
//       />
//     </mesh>
//   );
// }

// function Shirt3(props) {
//   const image = useProductStore((state) => state.imgLogo);
//   const gl = useThree((state) => state.gl);
//   const position = useProductStore((state) => {
//     return { x: state.x, y: state.y, z: state.z };
//   });

//   const angle = useProductStore((state) => state.angle);

//   const updateImage = useProductStore((state) => state.updateProduct);
//   const addNewImgProduct = useProductStore((state) => state.addNewImgProduct);

//   const save = useProductStore((state) => state.save);

//   useEffect(() => {
//     if (save) {
//       addNewImgProduct(gl.domElement.toDataURL("image/png"));

//       // updateImage(gl.domElement.toDataURL("image/png"));
//       // console.log(gl.domElement.toDataURL("image/png"));
//     }
//   }, [save]);
//   // @ts-ignore
//   const { nodes, materials } = useGLTF("/shirt_baked3.glb");
//   useFrame((state, delta) =>
//     easing.dampC(materials.lambert1.color, "#cf3232", 0.25, delta)
//   );
//   console.log();
//   return (
//     <mesh
//       castShadow
//       geometry={nodes.T_Shirt_male.geometry}
//       material={materials.lambert1}
//       material-roughness={1}
//       {...props}
//       dispose={null}
//       scale={0.5}
//     >
//       <Decal
//         position={[position.x, position.y, position.z]}
//         rotation={[0, 0, angle]}
//         scale={0.15}
//         map={useTexture(image)}
//       />
//     </mesh>
//   );
// }
// interface Props {
//   children?: ReactNode;
//   type: "submit" | "button";
//   className: string;
// }
// export type Ref = HTMLButtonElement;
// // eslint-disable-next-line react/display-name
// const SelectItem = forwardRef<Ref, Props>(
//   ({ children, className, ...props }, forwardedRef) => {
//     return (
//       <Select.Item
//         className={classnames("SelectItem", className)}
//         {...props}
//         ref={forwardedRef}
//       >
//         <Select.ItemText>{children}</Select.ItemText>
//         <Select.ItemIndicator className="SelectItemIndicator">
//           <CheckIcon />
//         </Select.ItemIndicator>
//       </Select.Item>
//     );
//   }
// );

"use client";

export default function dnew() {
  return <></>;
}
