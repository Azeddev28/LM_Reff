import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button as MuiButton, Typography } from "@mui/material";
import { spacing, SpacingProps } from "@mui/system";
import fourOfourSvg from "../../../public/404.svg"

interface ButtonProps extends SpacingProps {
  component?: React.ElementType;
  to?: string;
  target?: string;
}

const Button = styled(MuiButton)<ButtonProps>(spacing);

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
  background: transparent;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function Page404() {
  return (
    <Wrapper>
      <img src="../../../public/404.svg" alt="" style={{height: "322px"}}/>
      <Helmet title="404 Error" />
      <Typography style={{fontSize: "100px", fontWeight: "600", color: "#181C32"}} component="h1" variant="h1" align="center" gutterBottom>
        404
      </Typography>
      <Typography style={{fontSize: "24px", fontWeight: "500"}} component="h2" variant="h5" align="center" gutterBottom>
      Oops! Page not Found.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="secondary"
        mt={2}
        style={{ backgroundColor: "#2F65CB" }}
      >
        Go to Home Page
      </Button>
    </Wrapper>
  );
}

export default Page404;