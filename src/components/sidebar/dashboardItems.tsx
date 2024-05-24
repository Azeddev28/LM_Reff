import { SidebarItemsType } from "../../types/sidebar";
import ClaimsIcon from "../../../public/claims-img.svg";
import EmployerListIcon from "../../../public/employeers-img.svg";
import referralsSvg from "../../../public/referrals-img.svg";
import logoutSvg from "../../../public/logout-img.svg";
import { useDispatch } from "react-redux";
import { setAccessToken, setAuthenticated } from "../../redux/slices/authSlice";

const handleLogoutClick = () => {
  const dispatch = useDispatch();
  dispatch(setAuthenticated(false))
  dispatch(setAccessToken(null));
  localStorage.removeItem('access');
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
  }
] as SidebarItemsType[];

const navItems = [
  {
    title: "",
    pages: pagesSection,
  },
];

export default navItems;
