"use client";

import { deletePost } from "@/lib/actions";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const PostInfo = ({ postId }: { postId: number }) => {
  const deletePostWithId = deletePost.bind(null, postId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.moreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">View</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Re-post</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form action={deletePostWithId}>
            <button type="submit" className="text-red-500">
              Delete
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostInfo;
