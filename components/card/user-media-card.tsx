import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between font-medium">
            <span className="text-gray-500">User Media</span>
            <Link href="/" className="text-xs text-primary hover:underline">
              See all
            </Link>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {postsWithMedia.length
          ? postsWithMedia.map((post) => (
              <div className="relative h-24 w-1/5" key={post.id}>
                <Image
                  src={post.img!}
                  alt=""
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            ))
          : "No media found!"}
      </CardContent>
    </Card>
  );
};

export default UserMediaCard;
