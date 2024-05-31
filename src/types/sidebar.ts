export type SidebarItemsType = {
  href: string;
  title: string;
  icon: string;
  onClick?: () => void;
  children?: SidebarItemsType[];
  badge?: string;
};
