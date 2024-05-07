import React from "react";
import styled from "@emotion/styled";
import { Drawer as MuiDrawer} from "@mui/material";
import { SidebarItemsType } from "../../types/sidebar";
import SidebarNav from "./SidebarNav";

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Brand = styled('div')`
  background-color:white;
  min-height: 56px;
  justify-content: center;
  cursor: pointer;
  display:flex;
  flex-direction:row;
  gap:12px;
  padding:20px 20px 20px 24px;

`;

const LogoText=styled('p')`
    color: black;
    // font-family: Nunito;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px; 
    margin:0px;
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
  return (
    <Drawer variant="permanent" {...rest}>
      <Brand>
         <img src="/favicon.svg" alt="logo-image" />
          <LogoText>Luminary Health</LogoText>
      </Brand>
      <SidebarNav items={items} />
      
    </Drawer>
  );
};

export default Sidebar;
