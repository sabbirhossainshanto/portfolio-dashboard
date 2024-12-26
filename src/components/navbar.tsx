"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";
import { navItems } from "../constant";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "../context/user.provider";
import { logOut } from "../services/Auth";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Header() {
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    setIsLoading(true);
    router.push("/login");
  };

  return (
    <Navbar maxWidth="full" disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Sabbir</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Sabbir</p>
        </NavbarBrand>
        {navItems?.map((item) => {
          return (
            <NavbarItem key={item?.title}>
              <Link
                color={pathname === item?.path ? "warning" : "foreground"}
                href={item?.path}
              >
                {item?.title}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitch />
        </NavbarItem>
        {user?.email && (
          <NavbarItem>
            <Button onPress={handleLogout} color="warning" variant="flat">
              Logout
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={pathname === item.path ? "warning" : "foreground"}
              href={item?.path}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
