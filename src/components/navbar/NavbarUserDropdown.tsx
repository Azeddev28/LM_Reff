import React from "react";
import styled from "@emotion/styled";
import { Power } from "react-feather";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  logoutUser } from "../../redux/slices/authSlice";
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


  const handleSignOut =  () => {
    dispatch(logoutUser());
     navigate("/auth/sign-in");
     
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