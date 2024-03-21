import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

function CameraRig({ children }) {
  const group = useRef();

  useFrame((state, delta) => {
    // set the initial position of the model

    const targetPosition = [0, 0, 2];

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // set the model rotation smoothly
  });

  return <group ref={group}>{children}</group>;
}

export default CameraRig;
