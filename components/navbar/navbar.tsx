"use client"

import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { SupportIcon } from "../icons/navbar/support-icon";
import { SearchIcon } from "../icons/searchicon";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { useCheckAdmin } from "../hooks/useCheckingAdmin";
import { MessageDropDown } from "./message-squre-more";
import { DarkModeSwitch } from "./darkmodeswitch";
import { toast } from "sonner";


interface Props {
  children: React.ReactNode;
}


export const NavbarWrapper = ({ children }: Props) => {
  const { isAdmin, userData } = useCheckAdmin()


  return (
    <div className="relative flex flex-col w-full  flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        className="w-full mx-auto bg-white dark:bg-black shadow"
        classNames={{
          wrapper: "w-full max-w-full ",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        {/* <ul className="sm:flex gap-x-6 hidden hover:text-black  transition-all text-gray-600 dark:text-gray-300 cursor-pointer items-center gap-5">

          {
            navLinks.map((item: any, index: number) => (
              <li className="hover:scale-x-110 transition-all light-font " key={index}>{item.name}</li>
            ))
          }
        </ul> */}

        <NavbarContent

          justify="end"
          className="w-fit ml-auto data-[justify=end]:flex-grow-0"
        >
          <NotificationsDropdown />
          {/* <DarkModeSwitch /> */}

          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      <div className="pt-10">
        {children}
      </div>
    </div>
  );
};
