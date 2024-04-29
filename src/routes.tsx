import DashboardLayout from "./layouts/Dashboard";
import  Referrals from "./pages/Referrals";
import Claims from "./pages/Claims";
import EmployerList from "./pages/EmployerList";
import Auth from "./layouts/Auth";
import SignIn from "./pages/auth/SignIn";
import DetailPage from "./pages/Referrals/[detailPage]";

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
  },
  {
    path: "/:id", // Dynamic route
    element: <DashboardLayout><DetailPage /></DashboardLayout>,
  },
  
];

export default routes;
