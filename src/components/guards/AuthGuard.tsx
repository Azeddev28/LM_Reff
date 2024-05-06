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
  const [getProfile,{data,isSuccess}]=useLazyGetProfileQuery({});
  


  useEffect(() => {
    if (accessToken !== null) {
      
      const fetchProfile = async () => {
        await getProfile({});
        if (isSuccess) {
          dispatch(setUserName(data.name));
        }
      };
      fetchProfile();
      navigate('/');
    } else {
      navigate("/auth/sign-in");
    }
  }, [accessToken, dispatch, navigate, isSuccess]);
     
  
  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
