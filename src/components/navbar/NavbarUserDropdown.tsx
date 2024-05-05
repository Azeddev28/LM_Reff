import React,{useEffect} from "react";
import styled from "@emotion/styled";
import { Power } from "react-feather";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  setAccessToken } from "../../redux/slices/authSlice";
import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";
import { setAuthenticated } from "../../redux/slices/authSlice";

// import useAuth from "../../hooks/useAuth";

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
  // const isAuthenticated = useSelector((state: any) => state);
  const {isAuthenticated,accessToken} = useSelector((state: any) => state.auth);
  console.log("IsAuthenticated from NavbarUserDropDown",isAuthenticated);
  console.log("accessToken from NavbarUserDropDown",accessToken);
  const toggleMenu = (event: React.SyntheticEvent) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };



  // useEffect(() => {
  //   if (isAuthenticated?.auth?.isAuthenticated === false) {
  //     console.log("USEEFFECT From Navbaruserdropdown");
  //     navigate("/auth/sign-in");
  //   }
  // }, [isAuthenticated?.auth?.isAuthenticated]);

 

  const handleSignOut =  () => {
    console.log("handle Sign out Click");
    dispatch(setAuthenticated(false))
    dispatch(setAccessToken(null));
    localStorage.removeItem('access');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("is Authnenticated state is changing ");
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated,accessToken]);

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
        {/* <MenuItem onClick={closeMenu}>Profile</MenuItem> */}
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default NavbarUserDropdown;
