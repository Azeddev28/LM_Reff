import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../redux/slices/authSlice";

interface AuthGuardType {
  children: React.ReactNode;
}
// TODO : authentication needs to be check
function AuthGuard({ children }: AuthGuardType) {
  const navigate = useNavigate();
  const accessToken = useSelector(getAccessToken);
 
  useEffect(() => { 
    if (accessToken !==null) {
     
      navigate("/");
      
    } else {
      navigate("/auth/sign-in");
      
    }
  }, [accessToken]);
     
  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
