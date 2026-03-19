"use client";

import { Suspense, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment, useGLTF } from "@react-three/drei";
import { useProductDetails } from "../../../hooks/queries/use-product-details";
import { ProductGallery } from "./ProductGallery";

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
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    if (!id) router.replace("/");
  }, [id, router]);

  const { data, isError, error } = useProductDetails(id ?? "");

  if (isError) {
    return (
      <p>{error instanceof Error ? error.message : "Something went wrong."}</p>
    );
  }

  //   es unda shevcvalo archeuli ferit
  const firstColor = data?.data?.colors?.[1] ?? null;

  if (!firstColor?.has3D || !firstColor.model3d) {
    return <ProductGallery />;
  }

  const modelUrl = firstColor.model3d.url;

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
