import { SidebarItemsType } from "../../types/sidebar";
import ClaimsIcon from "/claims-img.svg?url";
import EmployerListIcon from "/employeers-img.svg?url";
import referralsSvg from "/referrals-img.svg?url";
import logoutSvg from "/logout-img.svg?url";
import { logoutUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const useNavItems = () => {
  const dispatch = useDispatch();
  const handleLogoutClick = (event: any) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

  const pagesSection = [
    {
      href: "/",
      icon: referralsSvg,
      title: "Referrals",
    },
    {
      href: "/claims",
      icon: ClaimsIcon,
      title: "Claims",
    },
    {
      href: "/employe-list",
      icon: EmployerListIcon,
      title: "Employers",
    },
    {
      href: "/auth/sign-in",
      icon: logoutSvg,
      title: "Logout",
      onClick: handleLogoutClick,
    },
  ] as unknown as SidebarItemsType[];

  return [
    {
      title: "",
      pages: pagesSection,
    },
  ];
};

export default useNavItems;