"use client";

import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import { useOptimistic, useState } from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { UserAvatar } from "./user-avatar";

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (err) {}
  };
  const decline = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await declineFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (err) {}
  };

  const [optimisticRequests, removeOptimisticRequest] = useOptimistic(
    requestState,
    (state, value: number) => state.filter((req) => req.id !== value),
  );
  return (
    <div className="">
      {optimisticRequests.map((request) => (
        <div className="flex items-center justify-between" key={request.id}>
          <div className="flex items-center gap-4">
            <UserAvatar src={request.sender.avatar || "/noAvatar.png"} />
            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          <div className="flex justify-end gap-3">
            <form action={() => accept(request.id, request.sender.id)}>
              <Button size="icon" className="h-8 w-8">
                <Icons.check />
              </Button>
            </form>
            <form action={() => decline(request.id, request.sender.id)}>
              <Button variant="destructive" size="icon" className="h-8 w-8">
                <Icons.x />
              </Button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
