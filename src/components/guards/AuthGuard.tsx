import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../../redux/slices/authSlice";
import { getCookie } from "../../utils/cookieManager";

interface AuthGuardType {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardType) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const extractParams = (pathname: string, pattern: string) => {
    const patternParts = pattern.split('/');
    const pathParts = pathname.split('/');
    const params: Record<string, string> = {};

    patternParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        const paramName = part.slice(1);
        params[paramName] = pathParts[index];
      }
    });
    return params;
  };
  
  const params = extractParams(location.pathname, "/:uid/:token");
  const { uid, token } = params;

  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const access =  getCookie("access") 
  useEffect(() => {
    if (access) {      
      dispatch(setAuthenticated(true));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      if (uid && token && !location.pathname.includes("/auth")){
        navigate(`/${uid}/${token}`)
      }
      else{
        navigate("/auth/sign-in");
      }
    }
  }, [isAuthenticated]);

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;