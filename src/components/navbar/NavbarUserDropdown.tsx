import React from "react";
import styled from "@emotion/styled";
import { Power } from "react-feather";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  loginApi, logoutUser } from "../../redux/slices/authSlice";
import { referralApi } from "../../redux/slices/referralSlice";
import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function NavbarUserDropdown() {
  const dispatch=useDispatch();
  const [anchorMenu, setAnchorMenu] = React.useState<any>(null);
  const navigate = useNavigate();
  const toggleMenu = (event: React.SyntheticEvent) => {
    setAnchorMenu(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorMenu(null);
  };
  const handleSignOut = (event: any) => {
    event.preventDefault();
    dispatch(logoutUser());
    dispatch(loginApi.util.resetApiState());   //TODO implement a proper logic to remove cache
    dispatch(referralApi.util.resetApiState());
  };

  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={anchorMenu ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
  
        >
          <Power />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default NavbarUserDropdown;