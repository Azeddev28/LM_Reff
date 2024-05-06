import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../redux/slices/authSlice";
import { useLazyGetProfileQuery } from "../../redux/slices/referralAPiSlice";
import { useDispatch } from "react-redux";
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
    if (accessToken !==null) {     
      navigate("/");
      getProfileData();
    } else {
      navigate("/auth/sign-in");  
    }
  }, [accessToken,isSuccess]);
     
  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
