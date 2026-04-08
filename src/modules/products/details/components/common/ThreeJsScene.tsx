"use client";

import { Suspense } from "react";
import { redirect, useParams } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment, useGLTF } from "@react-three/drei";
import { useProductDetails } from "../../../hooks/queries/use-product-details";
import { useColorStore } from "../../store/useColorStore";

type ModelProps = {
  url: string;
};

function ProductModel({ url }: ModelProps) {
  const gltf = useGLTF(url);

  return (
    <Center>
      <primitive object={gltf.scene} />
    </Center>
  );
}

function CanvasLoader() {
  return null;
}

export function ThreeJsScene() {
  const params = useParams();
  const id = params.id as string;

  if (!id) redirect("/");

  const query = useProductDetails(id);
  const { data } = query;

  const { selectedColorIndex } = useColorStore();

  const chosenColor = data?.data?.colors?.[selectedColorIndex];

  if (!chosenColor?.has3D || !chosenColor.model3d) {
    return <p>ამ ფერს არ აქვს 3D მდოელი</p>;
  }

  const modelUrl = chosenColor.model3d.url;

  useGLTF.preload(modelUrl);

  return (
    <div className="h-103.5 sm:h-182 max-w-136.75 w-full rounded-xl overflow-hidden cursor-pointer bg-(--neutral-semi-white)">
      <Canvas camera={{ position: [90, 90, 4], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 3, -5]} intensity={0.6} />

        <Suspense fallback={<CanvasLoader />}>
          <ProductModel url={modelUrl} />
        </Suspense>

        <Environment preset="studio" />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
