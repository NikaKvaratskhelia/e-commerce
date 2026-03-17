"use client";

import { Suspense, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment, useGLTF } from "@react-three/drei";
import { useProductDetails } from "../../../hooks/queries/use-product-details";

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

  const { data, isLoading, isError, error } = useProductDetails(id ?? "");

  if (!id || isLoading) return <p>Loading product...</p>;

  if (isError) {
    return (
      <p>{error instanceof Error ? error.message : "Something went wrong."}</p>
    );
  }

  //   es unda shevcvalo archeuli ferit
  const firstColor = data?.data?.colors?.[0];

  if (!firstColor?.has3D || !firstColor.model3d) {
    return <p>This product color doesn&apos;t have a 3D model.</p>;
  }

  const modelUrl = firstColor.model3d.url;

  useGLTF.preload(modelUrl);

  return (
    <div className="max-h-182 max-w-136.75 w-full aspect-auto rounded-xl overflow-hidden border bg-(--neutral-semi-white)">
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
