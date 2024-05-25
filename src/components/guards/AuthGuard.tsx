import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../../redux/slices/authSlice";

interface AuthGuardType {
  children: React.ReactNode;
}
// TODO : authentication needs to be check
function AuthGuard({ children }: AuthGuardType) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const access = localStorage.getItem("access");

  useEffect(() => {
    if (access) {      
      dispatch(setAuthenticated(true));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated]);

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
