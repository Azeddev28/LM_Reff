import DashboardLayout from "./layouts/Dashboard";
import  Referrals from "./pages/Referrals";
import Claims from "./pages/Claims";
import EmployerList from "./pages/EmployerList";
import Auth from "./layouts/Auth";
import SignIn from "./pages/auth/SignIn";

const routes = [
  {
    path: "/",
    element: <DashboardLayout  />,
    children: [
      {
        path: "/",
        element: <Referrals />,
      }, 
    ],
  },
  {
    path: "/claims",
    element: <DashboardLayout><Claims /></DashboardLayout>,
  },
  {
    path: "employe-list",
    element: <DashboardLayout ><EmployerList /></DashboardLayout>,
  },
  {
    path:"auth/sign-in",
    element:<Auth><SignIn/></Auth>
  }
  
];

export default routes;
