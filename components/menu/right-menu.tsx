import { User } from "@prisma/client";
import Birthdays from "../birthdays";
import FriendRequests from "../friend-requests";

interface IRightMenuProps {
  user?: User;
}

const RightMenu = ({ user }: IRightMenuProps) => {
  return (
    <div className="flex flex-col gap-6">
      <FriendRequests />
      <Birthdays />
    </div>
  );
};

export default RightMenu;
