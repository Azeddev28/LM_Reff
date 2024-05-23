import React from "react";
import styled from "@emotion/styled";
import { Drawer as MuiDrawer } from "@mui/material";
import { SidebarItemsType } from "../../types/sidebar";
import SidebarNav from "./SidebarNav";
import { useNavigate } from "react-router-dom";

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
    background-color: white;
  }
`;

const Brand = styled('div')`
  background-color: #2F65CB;
  min-height: 56px;
  justify-content: center;
  cursor: pointer;
  display:flex;
  flex-direction:row;
  gap:12px;
  padding:20px 20px 20px 24px;
  align-items: center;

`;

const LogoText = styled('p')`
    color: white;
    font-family: inter;
    font-size: 13px;
    font-weight: 600;
    line-height: 24px; 
    margin:0px;
    background-color: #2F65CB;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter';
`;

const MenuItem = styled('button')`
/* item */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 12px;

width: 80px;
height: 80px;

border-radius: 12px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;

background-color: #2F65CB;
`;


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



  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" {...rest}>
      <Brand onClick={() => navigate("/")}>
        <img src="/favicon-white.svg" alt="logo-image" style={{ width: "60px", marginTop: "10px" }} />
      </Brand>
      <LogoText>Luminary</LogoText>
      <LogoText>Health</LogoText>
      <SidebarNav items={items} />
    </Drawer>
  );
};

export default Sidebar;
