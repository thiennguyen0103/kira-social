import { siteConfig } from "@/configs/site";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={siteConfig.routes.home}
      className="text-xl font-bold uppercase text-primary"
    >
      {siteConfig.logo}
    </Link>
  );
};

export default Logo;
