"use client";

import { useUser } from "@/src/context/user.provider";
import useCloseModal from "@/src/hooks/useCloseModal";
import { logOut } from "@/src/services/Auth";
import { INavLists } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { GoDash } from "react-icons/go";
import { LiaAngleRightSolid, LiaAngleUpSolid } from "react-icons/lia";
interface IProps {
  setShowMobileSidebar: Dispatch<SetStateAction<boolean>>;
  showMobileSidebar: boolean;
  navLists: INavLists[];
}

const MobileSidebar = ({
  showMobileSidebar,
  setShowMobileSidebar,
  navLists,
}: IProps) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(0);
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  const mobileSidebarRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    logOut();
    setIsLoading(true);
    router.push("/");
  };

  useCloseModal(mobileSidebarRef, () => {
    setShowMobileSidebar(false);
  });
  return (
    <div
      ref={mobileSidebarRef}
      className={`bg-[#405189] text-white fixed z-40   lg:hidden h-screen transition-all duration-300 w-[200px]  ${showMobileSidebar ? "translate-x-0" : "-translate-x-[300px]"}`}
    >
      <div>
        <div className={`px-4  flex  items-center justify-start mt-6 `}>
          <div className="">
            {user?.profilePhoto && (
              <Image
                className="object-cover rounded-full"
                src={user?.profilePhoto}
                height={50}
                width={50}
                alt="profile photo"
              />
            )}
          </div>
        </div>

        <div
          className={`flex flex-col justify-start gap-5  px-4 py-6 text-white   z-10 transition-all duration-300  `}
        >
          {navLists?.map((list, i) => {
            const isActive = activeMenu === i;
            const { icon: Icon } = list;
            return (
              <div key={i} className="mt-2">
                <button
                  onClick={() => setActiveMenu(isActive ? null : i)}
                  className={`${isActive ? "text-white" : "text-[#abb9e8]"} w-full flex gap-10 items-center text-sm   font-medium  group justify-between hover:text-white  transition-colors`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={20} />
                    <span>{list?.key}</span>
                  </div>
                  {isActive ? <LiaAngleUpSolid /> : <LiaAngleRightSolid />}
                </button>
                {list?.children && (
                  <div
                    className={`transition-all duration-500 overflow-hidden  mt-3 ${
                      isActive
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {list?.children.map((child) => (
                      <Link
                        onClick={() => setShowMobileSidebar(false)}
                        key={child?.path}
                        href={child?.path}
                        className={` pt-1 flex items-center text-xs hover:text-white mb-3 gap-5 transition-colors ${
                          pathname === child?.path
                            ? "text-white"
                            : "text-[#abb9e8]"
                        }`}
                      >
                        <GoDash />
                        {child?.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="mt-4">
            <button
              onClick={handleLogout}
              className="flex gap-2 items-center text-[18px] font-medium"
            >
              <span>
                <AiOutlineLogout size={20} />
              </span>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
