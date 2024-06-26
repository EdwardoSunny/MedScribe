"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "../utils/cn";
import Link from "next/link";

export function NavbarWrapper() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2 rounded-3xl" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/">
          <MenuItem setActive={setActive} active={active} item="Home">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Go home!</HoveredLink>
            </div>
          </MenuItem>
        </Link>

        <Link href="/pages/profile">
          <MenuItem setActive={setActive} active={active} item="Profile">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Upload your visit!</HoveredLink>
            </div>
          </MenuItem>
        </Link>

        <Link href="/pages/summary">
          <MenuItem setActive={setActive} active={active} item="Summary">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">
                See a summary of your visit!
              </HoveredLink>
            </div>
          </MenuItem>
        </Link>

        <Link href="/pages/chat">
          <MenuItem setActive={setActive} active={active} item="Chat">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Chat with our AI!</HoveredLink>
            </div>
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
