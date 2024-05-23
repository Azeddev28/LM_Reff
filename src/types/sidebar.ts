export type SidebarItemsType = {
  href: string;
  title: string;
  icon: string;
  children?: SidebarItemsType[];
  badge?: string;
};
