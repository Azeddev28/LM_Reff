import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../../redux/slices/authSlice";
import { getCookie } from "../../utils/cookieManager";
import { appRoutes, authRoutes } from "../../routes";
import { checkPathAgainstRoutes } from "../../utils/routeUtils";

interface AuthGuardType {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardType) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const access =  getCookie("access") 

  useEffect(() => {
    if (isAuthenticated === false) {
      if (access) {
        dispatch(setAuthenticated(true));
      }
    }

    if (isAuthenticated === true && checkPathAgainstRoutes(location.pathname, authRoutes)) {
      navigate(appRoutes.dashboard.path);
    }
    else if (isAuthenticated === false && checkPathAgainstRoutes(location.pathname, appRoutes)) {
      navigate(authRoutes.login.path);
    }


  }, [isAuthenticated]);


  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
