import MediaCard from "../card/media-card";
import ProfileCard from "../card/profile-card";
import { Separator } from "../ui/separator";

interface ILeftMenuProps {
  type: "home" | "profile";
}

const LeftMenu = ({ type }: ILeftMenuProps) => {
  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto py-4">
      <div className="flex flex-col gap-2">
        {type === "home" && (
          <>
            <ProfileCard />
            <Separator />
          </>
        )}
        <MediaCard />
      </div>
    </div>
  );
};

export default LeftMenu;
