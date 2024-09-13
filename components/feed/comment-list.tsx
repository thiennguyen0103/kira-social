"use client";

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmojiPicker } from "../emoji-picker";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
type CommentWithUser = Comment & { user: User };

const formSchema = z.object({
  desc: z.string().min(1),
});

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desc: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user || !values.desc) return;
    addOptimisticComment({
      id: Math.random(),
      desc: values.desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avatar: user.imageUrl || "/noAvatar.png",
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
      const createdComment = await addComment(postId, values.desc);
      setCommentState((prev) => [createdComment, ...prev]);
      form.reset();
    } catch (err) {}
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state],
  );

  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Write a comment..."
                            className="border-0 border-none bg-zinc-200/90 pr-14 focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
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
                <Button size="icon" type="submit">
                  <Icons.filledSend className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
      <div className="">
        {/* COMMENT */}
        {optimisticComments.map((comment) => (
          <div className="mt-6 flex justify-between gap-4" key={comment.id}>
            {/* AVATAR */}
            <Image
              src={comment.user.avatar || "noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            {/* DESC */}
            <div className="flex flex-1 flex-col gap-2">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>
              <div className="mt-2 flex items-center gap-8 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <Image
                    src="/like.png"
                    alt=""
                    width={12}
                    height={12}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">0 Likes</span>
                </div>
                <div className="">Reply</div>
              </div>
            </div>
            {/* TODO: handle comment actions */}
            <Button variant="ghost" size="icon">
              <Icons.moreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
