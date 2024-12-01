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
import { checkInUser, checkOutUser } from "@/actions/user.action";
import { toast } from "sonner";


interface Props {
  children: React.ReactNode;
}
const navLinks = [
  {
    name: "Projects",
    href: ""
  },
  {
    name: "My Tasks",
    href: ""
  },
  {
    name: "Inbox",
    href: ""
  },
  {
    name: "Kanban View  ",
    href: ""
  },
]

export const NavbarWrapper = ({ children }: Props) => {
  const [isCheckIn, setIsCheckIn] = useState(false);
  const { isAdmin, userData } = useCheckAdmin()
  useEffect(() => {
    // Check if the user is already checked in on component mount
    const checkInStatus = localStorage.getItem("isCheckIn") === "true";
    setIsCheckIn(checkInStatus);
  }, []);
  const CheckIn = async () => {

    const { data, error } = await checkInUser()
    console.log("🚀 ~ CheckIn ~ error:", error)
    console.log("🚀 ~ CheckIn ~ data:", data)
    if (error) {
      toast.success(error ? error : "Some Error in Check")
      return
    }
    if (data) {
      toast.success("Check In successFull")
      localStorage.setItem("isCheckIn", "true");
      setIsCheckIn(true);
    }
  }
  const CheckOut = async () => {
    const { data, error } = await checkOutUser()
    console.log("🚀 ~ CheckIn ~ error:", error)
    console.log("🚀 ~ CheckIn ~ data:", data)
    if (error) {
      toast.success(error ? error : "Some Error in Check Out")
      return
    }
    if (data) {
      localStorage.setItem("isCheckIn", "false");
      setIsCheckIn(false)
      toast.success("Check Out successFull")
    }
  }
  return (
    <div className="relative flex flex-col w-full  flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        className="w-full mx-auto fixed top-0 bg-white dark:bg-black"
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
          {/* <MessageDropDown />
          <NotificationsDropdown /> */}
          <DarkModeSwitch />
          <button
            onClick={CheckIn}
            disabled={isCheckIn}
            className={`text-xs sm:text-sm bg-[#05549F] text-white p-1 sm:p-2 rounded-full w-20 sm:w-24 hover:scale-105 transition-all duration-300 ${isCheckIn ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Check In
          </button>
          <button onClick={CheckOut} className=" text-xs sm:text-sm bg-[#9f0505] text-white p-1 sm:p-2 rounded-full w-20 sm:w-24 hover:scale-105 transition-all duration-300">
            Check Out
          </button>
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
