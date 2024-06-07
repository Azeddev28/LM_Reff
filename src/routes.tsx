import DashboardLayout from "./layouts/Dashboard";
import  Referrals from "./pages/Referrals";
import Claims from "./pages/Claims";
import EmployerList from "./pages/EmployerList";
import Auth from "./layouts/Auth";
import SignIn from "./pages/auth/SignIn";
import ResetPassword from "./pages/auth/ResetPassword";
import DetailPage from "./pages/Referrals/[detailPage]";
import ConfirmPassword from "./pages/auth/ConfirmPassword";
import Page404 from "./pages/auth/Page404";

export const authRoutes = {
  baseUrl: {
    path:"/",
    element:<Auth><SignIn/></Auth>,
  },
  login: {
    path:"/auth/sign-in",
    element:<Auth><SignIn/></Auth>,
  },
  resetPassword: {
    path:"/auth/reset-password",
    element:<Auth><ResetPassword/></Auth>,
  },
  confirmPassword: {
    path:"/:id/:token",
    element:<Auth><ConfirmPassword/></Auth>,
  },
  notFound: {
    path: "/404", 
    element: <Page404 />,
  },
  
};

export const appRoutes = {
  dashboard: {
    path: "/dashboard",
    element:  <DashboardLayout> <Referrals /></DashboardLayout> ,
    
  },
  claims: {
    path: "/claims",
    element: <DashboardLayout><Claims /></DashboardLayout>,
  },
  employerList: {
    path: "/employer-list",
    element: <DashboardLayout ><EmployerList /></DashboardLayout> ,
  },
  referralDetail: {
    path: "/:id", 
    element: <DashboardLayout><DetailPage /></DashboardLayout>,
  },
  
};
