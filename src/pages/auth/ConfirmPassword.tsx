import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Paper, Typography } from "@mui/material";

import ConfirmPasswordComponent from "../../components/auth/ConfirmPassword";


const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function ConfirmPassword() {
  return (
    <React.Fragment>
     
      <Wrapper>
        <Helmet title="Reset Password" />

        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Change Your Password
        </Typography>


        <ConfirmPasswordComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default ConfirmPassword;
