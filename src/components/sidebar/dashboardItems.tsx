import { SidebarItemsType } from "../../types/sidebar";
import ClaimsIcon from "/claims-img.svg?url";
import EmployerListIcon from "/employeers-img.svg?url";
import referralsSvg from "/referrals-img.svg?url";
import logoutSvg from "/logout-img.svg?url";
import { loginApi, logoutUser } from "../../redux/slices/authSlice";
import { referralApi } from "../../redux/slices/referralSlice";
import { useDispatch } from "react-redux";

const useNavItems = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = (event: any) => {
    event.preventDefault();
    dispatch(logoutUser());
    dispatch(loginApi.util.resetApiState());  //TODO implement a proper logic to remove cache
    dispatch(referralApi.util.resetApiState());
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
  ] as SidebarItemsType[];

  return [
    {
      title: "",
      pages: pagesSection,
    },
  ];
};

export default useNavItems;
