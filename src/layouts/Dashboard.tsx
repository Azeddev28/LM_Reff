import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Outlet, useLocation } from "react-router-dom";

import { Box, CssBaseline, Paper as MuiPaper } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { spacing } from "@mui/system";

import GlobalStyle from "../components/GlobalStyle";
import createTheme from "../theme";
import { THEMES } from "../constants";
import Navbar from "../components/navbar/Navbar";
import dashboardItems from "../components/sidebar/dashboardItems";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/Footer";


const drawerWidth = 100;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("screen_1200")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

interface DashboardType {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardType> = ({ children }) => {
  const router = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Close mobile menu when navigation occurs
  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <MuiThemeProvider theme={createTheme(THEMES.LIGHT)}>
      <Root>
        <CssBaseline />
        <GlobalStyle />

        <Drawer>
          <Box sx={{ display: { xs: "block", screen_1200: "none" } }}>
            <Sidebar
              PaperProps={{
                style: {
                  width: drawerWidth,
                  backgroundColor: "#2F65CB",
                }
              }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              items={dashboardItems}
            />
          </Box>
          <Box sx={{ display: { xs: "none", screen_1200: "block" } }}>
            <Sidebar
              PaperProps={{
                style: {
                  width: drawerWidth,
                  backgroundColor: "#2F65CB",
                }
              }}
              items={dashboardItems}
            />
          </Box>
        </Drawer>

        <AppContent>
          <Box sx={{ display: { xs: "block", screen_1200: "none", marginBottom: "30px" } }}><Navbar onDrawerToggle={handleDrawerToggle} /></Box>

          <MainContent p={isLgUp ? 12 : 5}>
            {children}
            <Outlet />
          </MainContent>
          {/* <Footer /> */}
        </AppContent>

      </Root>
    </MuiThemeProvider>
  );
};

export default Dashboard;
