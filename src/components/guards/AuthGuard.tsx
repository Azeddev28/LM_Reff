import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface AuthGuardType {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardType) {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!isAuthenticated) {
      navigate("/auth/sign-in");
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);
     
  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
