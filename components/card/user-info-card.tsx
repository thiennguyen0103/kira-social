import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import UpdateUser from "../update-user";
import UserInfoCardInteraction from "./user-info-card-interaction";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = auth();

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });

    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);
    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    followRes ? (isFollowing = true) : (isFollowing = false);
    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });

    followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between font-medium">
            <span className="text-gray-500">User Information</span>
            {currentUserId === user.id ? (
              <UpdateUser user={user} />
            ) : (
              <Link href="/" className="text-xs text-primary hover:underline">
                See all
              </Link>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium">
            {" "}
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {user.description && <p>{user.description}</p>}
        {user.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="" width={16} height={16} />
            <span>
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}
        {user.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="" width={16} height={16} />
            <span>
              Went to <b>{user.school}</b>
            </span>
          </div>
        )}
        {user.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="" width={16} height={16} />
            <span>
              Works at <b>{user.work}</b>
            </span>
          </div>
        )}
        {user.website && (
          <div className="flex items-center gap-1">
            <Image src="/link.png" alt="" width={16} height={16} />
            <Link href={user.website} className="font-medium text-blue-500">
              {user.website}
            </Link>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Image src="/date.png" alt="" width={16} height={16} />
          <span>Joined {formattedDate}</span>
        </div>
        {currentUserId && currentUserId !== user.id && (
          <div className="flex w-full flex-col gap-2">
            <UserInfoCardInteraction
              userId={user.id}
              isUserBlocked={isUserBlocked}
              isFollowing={isFollowing}
              isFollowingSent={isFollowingSent}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
