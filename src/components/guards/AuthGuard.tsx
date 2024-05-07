import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetProfileQuery } from "../../redux/slices/referralAPiSlice";
// import {isAuthenticated} from "../../redux/slices/authSlice";
import { useDispatch,useSelector } from "react-redux";
import { setUserName } from "../../redux/slices/authSlice";
interface AuthGuardType {
  children: React.ReactNode;
}
// TODO : authentication needs to be check
function AuthGuard({ children }: AuthGuardType) {
  
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [getProfile,{data,isSuccess}]=useLazyGetProfileQuery();
  const {isAuthenticated}=useSelector((state)=>state.auth);
  
  const getProfileData = async () => {
    try {
      await getProfile(); 
      if (isSuccess) {
        dispatch(setUserName(data.name));
      } else {
        // Handle unsuccessful request if needed
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error fetching profile:", error);
    }
  };


  useEffect(() => { 
   
    if (!isAuthenticated) {     
      navigate("/auth/sign-in");
      
    } else {
      getProfileData();
      navigate("/");  
    }
  }, [isSuccess,isAuthenticated]);
     
  return( 
  <React.Fragment>{children}</React.Fragment>
  
  )
}

export default AuthGuard;
