import LeftMenu from "@/components/menu/left-menu";
import RightMenu from "@/components/menu/right-menu";

export default function Home() {
  return (
    <div className="container">
      <div className="relative flex w-full gap-6">
        <div className="sticky left-0 top-0 hidden w-full max-w-64 xl:block">
          <LeftMenu type="home" />
        </div>
        <div className="sticky px-auto flex w-full max-w-[680px] flex-1 flex-col gap-6 py-4">
          d
          {/* <Stories />
          <AddPost />
          <Feed /> */}
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
    </div>
  );
}
