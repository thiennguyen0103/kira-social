import LeftMenu from "@/components/menu/left-menu";
import RightMenu from "@/components/menu/right-menu";

export default function Home() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden w-full max-w-64 xl:block">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          {/* <Stories />
          <AddPost />
          <Feed /> */}
        </div>
      </div>
      <div className="hidden w-full max-w-72 lg:block">
        <RightMenu
          user={{
            avatar: "",
            city: "",
            cover: "",
            createdAt: new Date(),
            description: "",
            id: "1",
            name: "Thien",
            school: "test",
            surname: "t",
            username: "tehio",
            website: "rterae",
            work: "te",
          }}
        />
      </div>
    </div>
  );
}
