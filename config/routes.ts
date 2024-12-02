// routes.ts (or routes.tsx)
import { ProductsIcon } from "@/components/icons/sidebar/products-icon";
import {
  User,
  Home,
  LayoutGrid,
  Users,
  BriefcaseBusiness,
  Handshake,
  Aperture,
} from "lucide-react";

export const routes = [
  {
    title: "Home",
    icon: Home,
    href: "/dashboard",
    admin: true,

  },
  {
    title: "Admins",
    icon: User,
    href: "/dashboard/accounts",
    admin: true,
  },
  {
    title: "Employees",
    icon: Users,
    href: "/dashboard/employee",
    admin: true,
  },
  {
    title: "Tasks Management",
    icon: LayoutGrid,
    href: "/dashboard/task",
    admin: true,
  },
  {
    title: "My Tasks",
    icon: LayoutGrid,
    href: "/dashboard/my-task",
    admin: false,
  },
  {
    title: "Offers",
    icon: Aperture,
    href: "/dashboard/offers",
    admin: true,
  },
  {
    title: "Partners",
    icon: Handshake,
    href: "/dashboard/partner",
    admin: true,
  },
  {
    title: "Work With Us",
    icon: BriefcaseBusiness,
    href: "/dashboard/work",
    admin: true,
  },


];
