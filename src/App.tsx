import React, { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { checkPathAgainstRoutes, extractParamsFromRoutes } from "./utils/routeUtils";

const clientSideEmotionCache = createEmotionCache();

function App({ emotionCache = clientSideEmotionCache }) {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const content = useRoutes(isAuthenticated ? Object.values(appRoutes) : Object.values(authRoutes));

  const location = useLocation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const access = getCookie("access")
  const params = extractParamsFromRoutes(location.pathname)
  const paramsArray=Object.values(params)


  useEffect(() => {
    if (isAuthenticated === false) {
      if (access) {
        dispatch(setAuthenticated(true));
        if(params?.detail){
          navigate(`/detail/${paramsArray[1]}`)
        }
        else{
          navigate(appRoutes.dashboard.path);
        }
      }
      else{
        if(params?.confirm){
          navigate(`/confirm/${paramsArray[1]}/${paramsArray[2]}`)
        }
          else if(!content && !isAuthenticated && !params.confirm) {
          navigate(authRoutes.login.path);
        }
      }
    }
  }, [isAuthenticated, navigate]);

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
