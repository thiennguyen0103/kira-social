"use client";

import { siteConfig } from "@/configs/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky left-0 top-0 w-full bg-background px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex h-16 items-center justify-between gap-8">
        <div className="md:hidden lg:block">
          <Logo />
        </div>
        <div className="hidden w-[50%] flex-1 items-center justify-between text-sm md:flex">
          <div className="flex gap-6">
            {siteConfig.nav.map((nav) => {
              const isActive = pathname === nav.path;
              const Icon = isActive ? nav.filledIcon : nav.outlinedIcon;
              return (
                <Link
                  key={nav.id}
                  href={nav.path}
                  className={cn(
                    "flex items-center gap-2 text-gray-600",
                    isActive && "text-primary",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{nav.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="hidden items-center rounded-xl xl:flex">
            <Input placeholder="Search..." />
          </div>
        </div>
        <div className="">
          <Button>
            <Icons.personCircle className="mr-2 h-5 w-5" />
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
