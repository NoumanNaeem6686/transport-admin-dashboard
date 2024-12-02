// routes.ts (or routes.tsx)
import { ProductsIcon } from "@/components/icons/sidebar/products-icon";
import {
  LayoutDashboard,
  UserRoundCog,
  Columns4,
  CalendarSearch,
  ChartSpline,
  PackageSearch,
  User,
  ShoppingCart,
  Home,
  LayoutGrid,
  Users,
  CreditCard,
  Settings,
  Banknote,
  History,
  BriefcaseBusiness,
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
    title: "Work With Us",
    icon: BriefcaseBusiness,
    href: "/dashboard/work",
    admin: true,
  },
];
