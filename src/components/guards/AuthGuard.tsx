import React, { useEffect } from "react";
import { useNavigate , useLocation} from "react-router-dom";
import { useSelector } from "react-redux";

interface AuthGuardType {
  children: React.ReactNode;
}
// TODO : authentication needs to be check
function AuthGuard({ children }: AuthGuardType) {
  
  const navigate = useNavigate();
  const location = useLocation();

  
  const {isAuthenticated}=useSelector((state:any)=>state.auth);

  useEffect(() => { 
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const uid = searchParams.get('uid');

    if (!isAuthenticated) {   
      if (token && uid) {
        navigate("/auth/password/reset/confirm/");
      } else {
        navigate("/auth/sign-in");
      }
    } 
    else {
      navigate("/");  
    }
  }, [isAuthenticated]);
     
  return( 
  <React.Fragment>{children}</React.Fragment>
  
  )
}

export default AuthGuard;
