"use client";
import { useUser } from "@/src/context/user.provider";
import { logOut } from "@/src/services/Auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineLogout } from "react-icons/ai";
import { LiaAngleRightSolid, LiaAngleUpSolid } from "react-icons/lia";
import { useState } from "react";
import { GoDash, GoHome } from "react-icons/go";
import { INavLists } from "@/src/types";

interface IProps {
  collapseSidebar: boolean;
  navLists: INavLists[];
}
const DesktopSidebar = ({ collapseSidebar, navLists }: IProps) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(0);
  const pathname = usePathname();
  const { setIsLoading } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logOut();
    setIsLoading(true);
    router.push("/");
  };

  return (
    <div
      className={`bg-[#405189] text-white fixed z-50 hidden  lg:block h-screen transition-all duration-300 ${collapseSidebar ? "w-[100px]" : "w-[300px]"}`}
    >
      <div>
        <div
          className={`px-4 py-2 flex text-2xl  items-center mt-6 ${collapseSidebar ? "justify-center" : "justify-start"}`}
        >
          <Link href="/">
            {!collapseSidebar && (
              <>
                <span className="text-[#ff1cf7]">Sabbir</span>
              </>
            )}
            {collapseSidebar && <GoHome />}
          </Link>
        </div>

        <div
          className={`flex flex-col ${collapseSidebar ? "items-center" : "justify-start"} gap-5  px-4 py-6 text-white   z-10 transition-all duration-300  `}
        >
          {navLists?.map((list, i) => {
            const { icon: Icon } = list;
            const isActive = activeMenu === i;
            return (
              <div key={i} className="mt-2">
                <button
                  onClick={() => setActiveMenu(isActive ? null : i)}
                  className={`${isActive ? "text-white" : "text-[#abb9e8]"} w-full flex gap-10 items-center text-lg   font-medium  group ${collapseSidebar ? "justify-center" : "justify-between"} hover:text-white  transition-colors`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={collapseSidebar ? 30 : 22} />
                    <span>{!collapseSidebar && list?.key}</span>
                  </div>
                  {!collapseSidebar && isActive && <LiaAngleUpSolid />}
                  {!collapseSidebar && !isActive && <LiaAngleRightSolid />}
                </button>
                {!collapseSidebar && list?.children && (
                  <div
                    className={`transition-all duration-500 overflow-hidden  mt-3 ${
                      isActive
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {list?.children.map((child) => (
                      <Link
                        key={child?.path}
                        href={child?.path}
                        className={` pt-1 flex items-center text-base hover:text-white mb-3 gap-5 transition-colors ${
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
              className="flex gap-2 items-center text-lg font-medium text-[#abb9e8] hover:text-white transition-colors"
            >
              <span>
                <AiOutlineLogout size={collapseSidebar ? 30 : 22} />
              </span>
              {!collapseSidebar && "Log Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
