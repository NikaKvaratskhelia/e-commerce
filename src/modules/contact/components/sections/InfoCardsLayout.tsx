import { InfoCard } from "@/src/modules/home/components/common/InfoCard";
import Image from "next/image";

export function InfoCardsLayout() {
  return (
    <div className="bg-(--neutral-semi-white)">
      <div className="max-w-280 mx-auto w-full flex items-center justify-center flex-wrap gap-6 px-8 w1120:px-0">
        <div className="flex gap-2 sm:gap-6 w-full justify-center max-w-137">
          <InfoCard
            icon={
              <Image src={"/truck.svg"} alt="icon" width={48} height={48} />
            }
            heading={"Free Shipping"}
            text={"Order above $200"}
          />
          <InfoCard
            icon={
              <Image src={"/money.svg"} alt="icon" width={48} height={48} />
            }
            heading={"Money-back"}
            text={"30 days gurantee"}
          />
        </div>
        <div className="flex gap-2 sm:gap-6 w-full justify-center max-w-137">
          <InfoCard
            icon={<Image src={"/lock.svg"} alt="icon" width={48} height={48} />}
            heading={"Secure Payments"}
            text={"Secured by Stripe"}
          />
          <InfoCard
            icon={
              <Image src={"/phone.svg"} alt="icon" width={48} height={48} />
            }
            heading={"24/7 Support"}
            text={"Phone and Email support"}
          />
        </div>
      </div>
    </div>
  );
}
