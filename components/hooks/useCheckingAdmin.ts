"use client";
import { useSession } from "next-auth/react";

export const useCheckAdmin = () => {
    const session = useSession();
    const isAdmin = session.data?.user?.type === "admin";
    const userData = session.data
    // console.log("🚀 ~ useCheckAdmin ~ isAdmin:", session.data)
    return { isAdmin, userData };
}
