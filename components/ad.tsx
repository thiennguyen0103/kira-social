import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

interface IAdProps {
  size: "sm" | "md" | "lg";
}

const Ad = ({ size }: IAdProps) => {
  return (
    <div className="rounded-lg bg-background p-4 text-sm shadow-card">
      <div className="flex items-center justify-between font-medium text-gray-500">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      <div
        className={cn("mt-4 flex flex-col", size === "sm" ? "gap-2" : "gap-4")}
      >
        <div
          className={cn(
            "relative w-full",
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48",
          )}
        >
          <Image
            src="https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="font-medium text-blue-500">BigChef Lounge</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            : size === "md"
              ? "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."}
        </p>
        <Button size="sm">Learn more</Button>
      </div>
    </div>
  );
};

export default Ad;
