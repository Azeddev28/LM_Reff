import DashboardLayout from "./layouts/Dashboard";
import  Referrals from "./pages/Referrals";
import Claims from "./pages/Claims";
import EmployerList from "./pages/EmployerList";
import Auth from "./layouts/Auth";
import SignIn from "./pages/auth/SignIn";
import ResetPassword from "./pages/auth/ResetPassword";
import DetailPage from "./pages/Referrals/[detailPage]";
import AuthGuard from "./components/guards/AuthGuard";
import ConfirmPassword from "./pages/auth/ConfirmPassword";
const routes = [
  {
    path: "/",
    element:  <DashboardLayout> <Referrals /></DashboardLayout> ,
    
  },
  {
    path: "/claims",
    element: <DashboardLayout><Claims /></DashboardLayout>,
  },
  {
    path: "employe-list",
    element: <DashboardLayout ><EmployerList /></DashboardLayout> ,
  },
  {
    path:"auth/sign-in",
    element:<Auth><SignIn/></Auth>,
  },
  {
    path:"auth/reset-password",
    element:<Auth><ResetPassword/></Auth>,
  },
  {
    path:"/:uid/:token",
    element:<Auth><ConfirmPassword/></Auth>,
  },
  {
    path: "/:id", 
    element: <DashboardLayout><DetailPage /></DashboardLayout>,
  },
  
];

export default routes;
