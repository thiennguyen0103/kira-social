import { siteConfig } from "@/configs/site";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { UserAvatar } from "../user-avatar";

const ProfileCard = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  // if (!user) return null;

  return (
    <div>
      <div className="relative h-20">
        <Image
          // src={user.cover || "/noCover.png"}
          src={"/noCover.jpg"}
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <UserAvatar
          src={"/noAvatar.png"}
          className="absolute -bottom-6 left-0 right-0 z-10 m-auto h-12 w-12 rounded-full object-cover ring-1 ring-white"
        />
      </div>
      <div className="flex h-full flex-col items-center gap-2 pt-6">
        <span className="font-semibold">
          {/* {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username} */}
          Username
        </span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <UserAvatar
              src={
                "https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              }
              className="!h-5 !w-5"
            />
            <UserAvatar
              src={
                "https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              }
              className="!h-5 !w-5"
            />
            <UserAvatar
              src={
                "https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              }
              className="!h-5 !w-5"
            />
          </div>
          <span className="text-xs text-gray-500">
            {/* {user._count.followers} Followers */}
            10 Followers
          </span>
        </div>
        {/* <Link href={`/profile/${user.username}`}> */}
        <Button size="sm" asChild>
          <Link href={siteConfig.routes.profile}>My Profile</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 rounded-lg bg-white p-4 text-sm shadow-card">
      <div className="relative h-20">
        <Image
          // src={user.cover || "/noCover.png"}
          src={"/noCover.jpg"}
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <UserAvatar
          src={"/noAvatar.png"}
          className="absolute -bottom-6 left-0 right-0 z-10 m-auto h-12 w-12 rounded-full object-cover ring-1 ring-white"
        />
      </div>
      <div className="flex h-full flex-col items-center gap-2">
        <span className="font-semibold">
          {/* {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username} */}
          Username
        </span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <UserAvatar
              src={
                "https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              }
              className="!h-5 !w-5"
            />
            <UserAvatar
              src={
                "https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              }
              className="!h-5 !w-5"
            />
            <UserAvatar
              src={
                "https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              }
              className="!h-5 !w-5"
            />
          </div>
          <span className="text-xs text-gray-500">
            {/* {user._count.followers} Followers */}
            10 Followers
          </span>
        </div>
        {/* <Link href={`/profile/${user.username}`}> */}
        <Button size="sm" asChild>
          <Link href={siteConfig.routes.profile}>My Profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
