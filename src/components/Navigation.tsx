"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { StarWarsLogo } from "./StarWarsLogo";
import { useState } from "react";

const menuItems = [
  {
    name: "Characters",
    url: "/characters",
  },
  {
    name: "Films",
    url: "/films",
  },
  {
    name: "Favorites",
    url: "/favorites",
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const isActive = (href: string): boolean => pathname === href;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <StarWarsLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index} isActive={isActive(item.url)}>
            <Link aria-current="page" href={item.url}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full"
              color={isActive(item.url) ? "primary" : "foreground"}
              href={item.url}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
