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

  // Check authentication state on mount [UPDATED]
  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) {
      dispatch(setAuthenticated(true)); // [UPDATED]
    }
  }, [dispatch]);

  useEffect(() => {
    const access = localStorage.getItem("access"); // [UPDATED]
    if (access) {
      navigate("/");
    } else {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated]);

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
