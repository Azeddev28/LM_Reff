import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

interface AuthGuardType {
  children: React.ReactNode;
}
// TODO : authentication needs to be check
function AuthGuard({ children }: AuthGuardType) {
  
  const navigate = useNavigate();
  
  const {isAuthenticated}=useSelector((state)=>state.auth);
  useEffect(() => { 
   
    if (!isAuthenticated) {     
      navigate("/auth/sign-in");
      
    } else {
      // getProfileData();
      navigate("/");  
    }
  }, [isAuthenticated]);
     
  return( 
  <React.Fragment>{children}</React.Fragment>
  
  )
}

export default AuthGuard;
