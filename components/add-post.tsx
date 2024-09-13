"use client";

import { addPost } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmojiPicker } from "./emoji-picker";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const formSchema = z.object({
  desc: z.string().min(1),
});

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [img, setImg] = useState<any>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desc: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("desc", values.desc);
      await addPost(formData, img?.secure_url || "");
      form.reset();
    } catch (error) {}
  };

  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div className="flex justify-between gap-4 rounded-lg bg-muted p-4">
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 rounded-full object-cover"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="What's on your mind?"
                          {...field}
                        />
                        <div className="absolute right-2 top-2">
                          <EmojiPicker
                            onChange={(emoji: string) =>
                              field.onChange(`${field.value} ${emoji}`)
                            }
                          />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col justify-start gap-2">
                <Button size="sm">Add</Button>
              </div>
            </div>
          </form>
        </Form>
        {/* POST OPTIONS */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Image
                      src="/addimage.png"
                      alt=""
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() => open()}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Photo/Video</p>
                  </TooltipContent>
                </Tooltip>
              );
            }}
          </CldUploadWidget>
          {/* TODO: handle event */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                src="/poll.png"
                alt=""
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Poll</p>
            </TooltipContent>
          </Tooltip>
          {/* TODO: handle event */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                src="/addevent.png"
                alt=""
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Event</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
