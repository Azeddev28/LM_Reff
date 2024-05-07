import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../redux/slices/authSlice";
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
  const accessToken = useSelector(getAccessToken);
  const dispatch=useDispatch();
  const [getProfile,{data,isSuccess}]=useLazyGetProfileQuery();
  const {isAuthenticated}=useSelector((state)=>state.auth);
  console.log("IsAuthenticated",isAuthenticated);
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
    console.log("UseEffect has been changed")
    if (!isAuthenticated) {     
      navigate("/auth/sign-in");
      
    } else {
      getProfileData();
      navigate("/");  
    }
  }, [isSuccess,isAuthenticated]);
     
  return( 
  <>
  {console.log("AuthGuard has been call")}
  <React.Fragment>{children}</React.Fragment>
  </>
  )
}

export default AuthGuard;
