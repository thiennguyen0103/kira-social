import { User } from "@prisma/client";
import { Suspense } from "react";
import Ad from "../ad";
import Birthdays from "../birthdays";
import UserInfoCard from "../card/user-info-card";
import UserMediaCard from "../card/user-media-card";
import FriendRequests from "../friend-requests";

interface IRightMenuProps {
  user?: User;
}

const RightMenu = ({ user }: IRightMenuProps) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RightMenu;
