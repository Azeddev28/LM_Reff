import { SidebarItemsType } from "../../types/sidebar";

const pagesSection = [
  {
    href: "/",
    // icon: Sliders,
    title: "Referrals",
  },
  {
    href: "/claims",
    // icon: Layout,
    title: "Claims",
  },
  {
    href: "/employe-list",
    // icon: Briefcase,
    title: "Employer List",
    // badge: "8",
  },
] as SidebarItemsType[];

const navItems = [
  {
    title: "",
    pages: pagesSection,
  },
];

export default navItems;
