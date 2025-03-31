"use client";
import React, { useRef, useEffect, useState } from "react";
import * as fabric from "fabric";
import { useProductStore } from "@/store/productStore";

const PreviewImage = ({ imageFile }: { imageFile: string }) => {
  const canvasRef = useRef(null);
  const [modifiedImageUrl, setModifiedImageUrl] = useState(null);
  const updateImgLogo = useProductStore((state) => state.updateImgLogo);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (imageFile) {
      console.log("se ejcuto imageFile", imageFile);
      fabric.FabricImage.fromURL(imageFile, {}, {}).then((img) => {
        // Dispose of the existing canvas if it exists
        if (fabricCanvasRef.current) {
          fabricCanvasRef.current.dispose();
        }

        // Create a new fabric canvas
        const canvas = new fabric.Canvas(canvasRef.current);
        fabricCanvasRef.current = canvas;

        const maxSize = Math.max(img.width, img.height);
        console.log("fromURL was executed ", maxSize);

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

        // Convert the canvas to a base64 image
        const dataURL = canvas.toDataURL({
          format: "png",
          quality: 1,
          multiplier: 1,
        });

        // Convert base64 to Blob
        fetch(dataURL)
          .then((res) => res.blob())
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            console.log("fetch was executed: ", url);
            updateImgLogo(url);
          });
      });
    }
    return () => {
      if (fabricCanvasRef.current) {
        console.log("Cleaning up the fabric canvas");
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [imageFile]);

  // Can use `modifiedImageUrl` as needed, for example, display it or send it to a server
  // console.log(modifiedImageUrl);

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
