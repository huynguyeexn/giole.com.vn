"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";
import { usePathname } from "next/navigation";

export default function MainHeader() {
  return (
    <header className="container mb-4">
      <div className="flex justify-between py-4 items-center">
        <div className="logo flex items-center">
          <Link href={"/"} title="Trang chủ">
            <Image src="/logo.webp" alt="giole.com.vn" height={70} width={70} />
          </Link>
        </div>
        <div className="menu hidden sm:block">
          <ListMenu />
        </div>
        <div className="menu-button block sm:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant={"outline"}>
                <HamburgerMenuIcon />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <div className="p-4 pb-0">
                  <ListMenu />
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Đóng</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

const menuUrls = [
  {
    name: "Trang chủ",
    url: "/",
  },
  {
    name: "Danh sách nhà thờ",
    url: "/danh-sach",
  },
  // {
  //   name: "Góp ý",
  //   url: "#",
  // },
  // {
  //   name: "Liên hệ",
  //   url: "#",
  // },
];

const ListMenu = () => {
  const mobileStyle = "border-l-2 border-b-0";
  const desktopStyle = "sm:border-l-0 sm:border-b-2";

  const hoverMobileStyle = "hover:bg-gray-200";
  const hoverDesktopStyle = "sm:hover:bg-transparent sm:hover:border-sky-800";

  const formatStyle = "cursor-pointer py-2 px-4";
  const activeStyle = "border-sky-800 bg-gray-200 sm:bg-transparent";

  const itemStyle = clsx(
    desktopStyle,
    mobileStyle,
    hoverMobileStyle,
    hoverDesktopStyle,
    formatStyle
  );

  const pathname = usePathname();

  const isActive = (url: string) => {
    return url === pathname ? activeStyle : "border-transparent";
  };

  return (
    <ul className="flex flex-col sm:flex-row sm:space-x-12 text-center">
      {menuUrls.map((item, index) => (
        <Link
          key={item.url + index}
          href={item.url}
          className={clsx(itemStyle, isActive(item.url))}
        >
          {item.name}
        </Link>
      ))}
    </ul>
  );
};
