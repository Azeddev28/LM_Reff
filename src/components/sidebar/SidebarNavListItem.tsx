import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { NavLink, NavLinkProps } from "react-router-dom";
import { rgba, darken } from "polished";

import {
  Chip,
  Collapse,
  ListItemProps,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { width } from "@mui/system";

const CustomRouterLink = forwardRef<any, NavLinkProps>((props, ref) => (
  <div ref={ref}>
    <NavLink {...props} />
  </div>
));

CustomRouterLink.displayName = "CustomRouterLink";

type ItemType = {
  activeclassname?: string;
  onClick?: () => void;
  to?: string;
  component?: typeof NavLink;
  depth: number;
};

const Item = styled(ListItemButton) <ItemType>`
display: flex;
flex-direction: column;
margin-bottom: 10px;
margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 14 : 8)};
  padding-right: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 4 : 7)};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.08);
    color: ${(props) => props.theme.sidebar.color};
  }
  &.${(props) => props.activeclassname} {
    /* item */

background: #1847A0;
border: 1px solid #1847A0;
border-radius: 12px;
margin-right: 14px;
margin-left: 14px;
height: auto;
  }
`;

type TitleType = {
  depth: number;
};

const Title = styled(ListItemText) <TitleType>`
  margin: 0;
  span {
    color: white;
    font-size: 11px;
    font-weight: 500;
    padding: 0 ${(props) => props.theme.spacing(4)};
    margin-top: 10px;
  }
  
`;

const Badge = styled(Chip)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 26px;
  top: 12px;
  background: ${(props) => props.theme.sidebar.badge.background};
  z-index: 1;
  span.MuiChip-label,
  span.MuiChip-label:hover {
    font-size: 11px;
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`;

const ExpandLessIcon = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const ExpandMoreIcon = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

type SidebarNavListItemProps = ListItemProps & {
  className?: string;
  onClick?: () => void;
  depth: number;
  href: string;
  icon: string;
  badge?: string;
  open?: boolean;
  title: string;
};

const SidebarNavListItem: React.FC<SidebarNavListItemProps> = (props) => {
  const {
    title,
    href,
    depth = 0,
    children,
    icon,
    badge,
    onClick,
    open: openProp = false,
  } = props;

  const [open, setOpen] = React.useState(openProp);

  const handleToggle = () => {
    setOpen((state) => !state);
  };

  if (children) {
    return (
      <React.Fragment>
        <Item depth={depth} onClick={handleToggle}>

          <img src={icon} alt="" />
          <Title depth={depth}>
            {title}
            {badge && <Badge label={badge} />}
          </Title>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Item>
        <Collapse in={open}>{children}</Collapse>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Item
        depth={depth}
        component={CustomRouterLink}
        to={href}
        activeclassname="active"

        onClick={onClick}
      >

        <img src={icon} alt="" style={{width: '25px'}}/>
        <Title depth={depth}>
          {title}
          {badge && <Badge label={badge} />}
        </Title>
      </Item>

    </React.Fragment>

  );
};

export default SidebarNavListItem;
