import { siteConfig } from "@/configs/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const MediaCard = () => {
  return (
    <div>
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
  );
};

export default MediaCard;
