import React, { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { CacheProvider } from "@emotion/react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "./i18n";
import createTheme from "./theme";
import useTheme from "./hooks/useTheme";
import createEmotionCache from "./utils/createEmotionCache";
import { setAuthenticated } from "./redux/slices/authSlice";
import { getCookie } from "./utils/cookieManager";
import { authRoutes, appRoutes } from "./routes";

const clientSideEmotionCache = createEmotionCache();

function App({ emotionCache = clientSideEmotionCache }) {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const content = useRoutes(isAuthenticated ? appRoutes : authRoutes);

  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const extractParams = (pathname: string, pattern: string) => {
    const patternParts = pattern.split('/');
    const pathParts = pathname.split('/');
    const params: Record<string, string> = {};

    patternParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        const paramName = part.slice(1);
        params[paramName] = pathParts[index];
      }
    });
    return params;
  };
  
  const params = extractParams(location.pathname, "/:uid/:token");
  const { uid, token } = params;

  const access =  getCookie("access") 
  useEffect(() => {
    if (access) {      
      dispatch(setAuthenticated(true));
    }
  }, []);

  useEffect(() =>{
    if(!content && isAuthenticated){
      navigate("/");
    }
    else if (!content && !isAuthenticated){
      navigate("auth/sign-in");
    }

  },[navigate])


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      if (uid && token && !location.pathname.includes("/auth")){
        navigate(`/${uid}/${token}`)
      }
      else{
        navigate("auth/sign-in");
      }
    }
  }, [isAuthenticated]);

  return (
    <CacheProvider value={emotionCache}>
      <HelmetProvider>
        <Helmet
          defaultTitle="Luminary Health"
        />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiThemeProvider theme={createTheme(theme)}>
              <React.Fragment>{content}</React.Fragment>
            </MuiThemeProvider>
          </LocalizationProvider>
      </HelmetProvider>
    </CacheProvider>
  );
}

export default App;
