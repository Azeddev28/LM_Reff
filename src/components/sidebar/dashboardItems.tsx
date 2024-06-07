import { SidebarItemsType } from "../../types/sidebar";
import ClaimsIcon from "/claims-img.svg?url";
import EmployerListIcon from "/employeers-img.svg?url";
import referralsSvg from "/referrals-img.svg?url";
import logoutSvg from "/logout-img.svg?url";
import { loginApi, logoutUser } from "../../redux/slices/authSlice";
import { referralApi } from "../../redux/slices/referralSlice";
import { useDispatch } from "react-redux";
import { appRoutes, authRoutes } from "../../routes";
import { useNavigate } from "react-router-dom";

const useNavItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutClick = (event: any) => {
    event.preventDefault();
    dispatch(logoutUser());
    dispatch(loginApi.util.resetApiState());  //TODO implement a proper logic to remove cache
    dispatch(referralApi.util.resetApiState());
    navigate(authRoutes.login.path, {replace: true})
  };

  const pagesSection = [
    {
      href: appRoutes.dashboard.path,
      icon: referralsSvg,
      title: "Referrals",
    },
    {
      href: appRoutes.claims.path,
      icon: ClaimsIcon,
      title: "Claims",
    },
    {
      href: appRoutes.employerList.path,
      icon: EmployerListIcon,
      title: "Employers",
    },
    {
      href: authRoutes.login.path,
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
