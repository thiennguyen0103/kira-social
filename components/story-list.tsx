"use client";

import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { Icons } from "./icons";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

type StoryWithUser = Story & {
  user: User;
};

const StoryList = ({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>();

  const { user } = useUser();

  const add = async () => {
    if (!img?.secure_url) return;

    addOptimisticStory({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,
      user: {
        id: userId,
        username: "Sending...",
        avatar: user?.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createdStory = await addStory(img.secure_url);
      setStoryList((prev) => [createdStory!, ...prev]);
      setImg(null);
    } catch (err) {}
  };

  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state],
  );
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="basis-1/4">
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="relative flex items-center rounded-full">
                    <Image
                      src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                      alt=""
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-full object-cover ring-2"
                      onClick={() => open()}
                    />
                    <div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center rounded-full bg-background/40 group-hover:flex">
                      <Icons.plus className="h-10 w-10" />
                    </div>
                  </div>
                  {img ? (
                    <form action={add}>
                      <button className="rounded-md bg-blue-500 p-1 text-xs text-white">
                        Send
                      </button>
                    </form>
                  ) : (
                    <span className="font-medium">Add a Story</span>
                  )}
                </div>
              );
            }}
          </CldUploadWidget>
        </CarouselItem>
        {/* STORY */}
        {optimisticStories.map((story) => (
          <CarouselItem className="basis-1/4 cursor-pointer" key={story.id}>
            <Image
              src={story.user.avatar || "/noAvatar.png"}
              alt=""
              width={80}
              height={80}
              className="h-20 w-20 rounded-full ring-2"
            />
            <span className="font-medium">
              {story.user.name || story.user.username}
            </span>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default StoryList;
