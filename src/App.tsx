import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
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

const clientSideEmotionCache = createEmotionCache();

function App({ emotionCache = clientSideEmotionCache }) {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const content = useRoutes(isAuthenticated ? appRoutes : Object.values(authRoutes));

  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const access =  getCookie("access") 

  useEffect(() => {
    if (!isAuthenticated) {
      if (access) {
        dispatch(setAuthenticated(true));
      }
      else{
        navigate(authRoutes.login.path);
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
