import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Avatar, Paper, Typography } from "@mui/material";

import { ReactComponent as Logo } from "../../vendor/logo.svg";
import SignInComponent from "../../components/auth/SignIn";

const Brand = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 64px;
  height: 64px;
  margin-bottom: 32px;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;


const ImageWrapper=styled('div')`
  display:flex;
   justify-content:center;
   height:30px;
   margin-bottom:15px;
`;


function SignIn() {
  return (
    <React.Fragment>
      <Wrapper>
        <ImageWrapper>
      <img src="/favicon.svg" alt="logo-image"/>
      </ImageWrapper>
         <Typography component="h2" variant="h2" align="center">
           Sign in to your account to continue
         </Typography>

        <SignInComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default SignIn;
