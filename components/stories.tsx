import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import StoryList from "./story-list";

const Stories = async () => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) return null;

  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followerId: currentUserId,
              },
            },
          },
        },
        {
          userId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  return <StoryList stories={stories} userId={currentUserId} />;
};

export default Stories;
