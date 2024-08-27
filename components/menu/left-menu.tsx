import { siteConfig } from "@/configs/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Ad from "../ad";
import ProfileCard from "../card/profile-card";

interface ILeftMenuProps {
  type: "home" | "profile";
}

const LeftMenu = ({ type }: ILeftMenuProps) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div className="flex flex-col gap-2 rounded-lg bg-card p-4 text-sm text-muted-foreground shadow-card">
        {siteConfig.leftMenu.map((menu) => (
          <Link
            key={menu.id}
            href={menu.path}
            className={cn(
              "flex items-center gap-4 rounded-lg p-2 hover:bg-accent",
            )}
          >
            <Image src={menu.icon} alt={menu.name} width={20} height={20} />
            <span>{menu.name}</span>
          </Link>
        ))}
      </div>
      <Ad size="sm" />
    </div>
  );
};

export default LeftMenu;
