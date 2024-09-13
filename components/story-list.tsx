"use client";

import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
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
    debugger;

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
    } catch (err) {
      console.log(err);
    }
  };

  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state],
  );

  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="basis-1/2 cursor-pointer sm:basis-1/3 md:basis-1/4">
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex h-full w-full cursor-pointer flex-col items-center overflow-hidden rounded-md border bg-background"
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                >
                  <Image
                    src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                    alt=""
                    width={500}
                    height={500}
                    className="h-4/5 w-full object-cover"
                  />
                  <div className="relative flex h-1/5 w-full items-center justify-center">
                    <Button
                      className="absolute -top-3.5 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full"
                      size="icon"
                    >
                      <Icons.plus />
                    </Button>
                    {img ? (
                      <form action={add}>
                        <Button type="submit" size="sm" className="h-7">
                          Send
                        </Button>
                      </form>
                    ) : (
                      <span className="font-medium">Add a Story</span>
                    )}
                  </div>
                </div>
              );
            }}
          </CldUploadWidget>
        </CarouselItem>
        {/* STORY */}
        {optimisticStories.map((story) => (
          <CarouselItem
            className="basis-1/2 cursor-pointer sm:basis-1/3 md:basis-1/4"
            key={story.id}
          >
            <div className="relative h-full overflow-hidden rounded-md">
              <Image
                src={story.img || "/noAvatar.png"}
                alt=""
                width={500}
                height={500}
                className="h-full w-full rounded-md object-cover duration-300 hover:scale-105"
              />
              <span className="absolute bottom-2 left-4 font-medium text-white">
                {story.user.name || story.user.username}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default StoryList;
