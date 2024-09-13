import Birthdays from "../birthdays";
import FriendRequests from "../friend-requests";

// interface IRightMenuProps {
//   user?: User;
// }

const RightMenu = () => {
  return (
    <div className="flex flex-col gap-6 py-4">
      <FriendRequests />
      <Birthdays />
    </div>
  );
};

export default RightMenu;
