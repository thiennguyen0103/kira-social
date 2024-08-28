"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { Button } from "./ui/button";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };

  return (
    <div className="">
      <span
        className="cursor-pointer text-xs text-blue-500"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-65">
          <form
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || "" })
            }
            className="relative flex w-full flex-col gap-2 rounded-lg bg-white p-12 shadow-md md:w-1/2 xl:w-1/3"
          >
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use the navbar profile to change the avatar or username.
            </div>
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result: any) => setCover(result.info)}
            >
              {({ open }: any) => {
                return (
                  <div
                    className="my-4 flex flex-col gap-4"
                    onClick={() => open()}
                  >
                    <label htmlFor="">Cover Picture</label>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={user.cover || "/noCover.png"}
                        alt=""
                        width={48}
                        height={32}
                        className="h-8 w-12 rounded-md object-cover"
                      />
                      <span className="text-xs text-gray-600 underline">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder={user.name || "John"}
                  className="rounded-md p-[13px] text-sm ring-1 ring-gray-300"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  placeholder={user.surname || "Doe"}
                  className="rounded-md p-[13px] text-sm ring-1 ring-gray-300"
                  name="surname"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Description
                </label>
                <input
                  type="text"
                  placeholder={user.description || "Life is beautiful..."}
                  className="rounded-md p-[13px] text-sm ring-1 ring-gray-300"
                  name="description"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  placeholder={user.city || "New York"}
                  className="rounded-md p-[13px] text-sm ring-1 ring-gray-300"
                  name="city"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  type="text"
                  placeholder={user.school || "MIT"}
                  className="rounded-md p-[13px] text-sm ring-1 ring-gray-300"
                  name="school"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Work
                </label>
                <input
                  type="text"
                  placeholder={user.work || "Apple Inc."}
                  className="rounded-md p-[13px] text-sm ring-1 ring-gray-300"
                  name="work"
                />
              </div>
              {/* INPUT */}

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  placeholder={user.website || "lama.dev"}
                  className="rounded-md p-[13px] text-sm ring-1 ring-gray-300"
                  name="website"
                />
              </div>
            </div>
            <Button>Update</Button>
            {state.success && (
              <span className="text-green-500">Profile has been updated!</span>
            )}
            {state.error && (
              <span className="text-red-500">Something went wrong!</span>
            )}
            <div
              className="absolute right-2 top-3 cursor-pointer text-xl"
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
