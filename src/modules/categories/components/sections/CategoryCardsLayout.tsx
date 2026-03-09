import { CategoryCard } from "../common/CategoryCard";

export function CategoryCardsLayout() {
  return (
    <div className="mx-auto flex flex-col items-center md:flex-row w-full max-w-280 gap-6 px-8 md:p-0">
      {/* es dinamiuri unda gaxdes roca davfetchav mere */}
      <CategoryCard
        category={{
          categoryPhoto:
            "https://nika-store-assets.s3.eu-north-1.amazonaws.com/LivingRoom.png",
          title: "Living Room",
        }}
        variant="col"
        href={""}
      />

      <div className="flex flex-1 flex-col gap-6 w-full items-center">
        <CategoryCard
          category={{
            categoryPhoto:
              "https://nika-store-assets.s3.eu-north-1.amazonaws.com/Bedroom.png",
            title: "Bedroom",
          }}
          variant="row"
          href={""}
        />

        <CategoryCard
          category={{
            categoryPhoto:
              "https://nika-store-assets.s3.eu-north-1.amazonaws.com/Kitchen.png",
            title: "Kitchen",
          }}
          variant="row"
          href={""}
        />
      </div>
    </div>
  );
}
