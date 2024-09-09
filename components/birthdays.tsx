import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Birthdays = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-500">Birthdays</h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="https://images.pexels.com/photos/18207381/pexels-photo-18207381/free-photo-of-window-in-bar.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-semibold">Wayne Burton</span>
          </div>
          <div className="flex justify-end gap-3">
            <Button size="sm">Celebrate</Button>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg bg-slate-100 p-4">
          <Image src="/gift.png" alt="" width={24} height={24} />
          <Link href="/" className="flex flex-col gap-1 text-xs">
            <span className="font-semibold text-gray-700">
              Upcoming Birthdays
            </span>
            <span className="text-gray-500">
              See other 16 have upcoming birthdays
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Birthdays;
