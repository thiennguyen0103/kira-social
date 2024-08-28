import Ad from "../ad";
import MediaCard from "../card/media-card";
import ProfileCard from "../card/profile-card";

interface ILeftMenuProps {
  type: "home" | "profile";
}

const LeftMenu = ({ type }: ILeftMenuProps) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <MediaCard />
      <Ad size="sm" />
    </div>
  );
};

export default LeftMenu;
