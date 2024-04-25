import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import ReferralLogo from "../../../public/Images/ReferralLogo.png";
import { green } from "@mui/material/colors";

import { Box, Chip, Drawer as MuiDrawer, ListItemButton } from "@mui/material";

// import { ReactComponent as Logo } from "../../vendor/logo.svg";
import { SidebarItemsType } from "../../types/sidebar";
import Footer from "./SidebarFooter";
import SidebarNav from "./SidebarNav";

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Brand = styled(ListItemButton)<{
  component?: React.ReactNode;
  to?: string;
}>`
  
  color: ${(props) => props.theme.sidebar.header.color};
  background-color:white;
  // background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;



const LogoImage = styled('img')(({  }) => ({
  width: '65%', // Adjust this as per your requirement
  height: 'auto', // Adjust this as per your requirement
  objectFit:'cover',
 
}));


export type SidebarProps = {
  PaperProps: {
    style: {
      width: number;
    };
  };
  variant?: "permanent" | "persistent" | "temporary";
  open?: boolean;
  onClose?: () => void;
  items: {
    title: string;
    pages: SidebarItemsType[];
  }[];
  showFooter?: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  items,
  showFooter = true,
  ...rest
}) => {
  return (
    <Drawer variant="permanent" {...rest}>
      <Brand component={NavLink as any} to="/">
         <LogoImage src={ReferralLogo} alt="logo-imahe" />
      </Brand>
      <SidebarNav items={items} />
      {!!showFooter && <Footer />}
    </Drawer>
  );
};

export default Sidebar;
