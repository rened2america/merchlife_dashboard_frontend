"use client";
import React, { useRef, useEffect, useState } from "react";
import * as fabric from "fabric";
import { useProductStore } from "@/store/productStore";

const PreviewImage = ({ imageFile }: { imageFile: string }) => {
  const canvasRef = useRef(null);
  const [modifiedImageUrl, setModifiedImageUrl] = useState(null);
  const updateImgLogo = useProductStore((state) => state.updateImgLogo);
  useEffect(() => {
    if (imageFile) {
      console.log("se ejcuto imageFile", imageFile);
      fabric.FabricImage.fromURL(imageFile, {}, {}).then((img) => {
        const canvas = new fabric.Canvas(canvasRef.current);
        const maxSize = Math.max(img.width, img.height);
        console.log("se ejecuto fromURL ", maxSize);

        canvas.setWidth(maxSize);
        canvas.setHeight(maxSize);

        img.set({
          left: (maxSize - img.width) / 2,
          top: (maxSize - img.height) / 2,
          scaleX: 1,
          scaleY: 1,
        });

        canvas.add(img);
        canvas.renderAll();

        // Convertir el canvas a imagen base64
        const dataURL = canvas.toDataURL({
          format: "png",
          quality: 1,
          multiplier: 1,
        });

        // Convertir base64 a Blob
        fetch(dataURL)
          .then((res) => res.blob())
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            console.log("se ejecuto fetch: ", url);
            updateImgLogo(url);
          });
      });
      // const canvas = new fabric.Canvas(canvasRef.current);
    }
    return () => {
      if (canvasRef.current?.fabric) {
        console.log("inRef", canvasRef.current);
        canvasRef?.current?.dispose();
      }
    };
  }, [imageFile]);

  // Aquí puedes usar `modifiedImageUrl` como necesites, por ejemplo, mostrarla o enviarla a un servidor
  console.log(modifiedImageUrl);

  return (
    <div
      style={{
        display: "none",
      }}
    >
      <canvas style={{ width: "200px" }} ref={canvasRef} />
    </div>
  );
};

export default PreviewImage;
