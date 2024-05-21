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

const SignInWrapper = styled.div`
  max-width: 400px;
`;

const ImageWrapper = styled('div')`
  display:flex;
   justify-content:center;
   height:50px;
   margin-bottom:15px;
`;

const ImageWrapperLeft = styled('div')`
  display:flex;
   justify-content:center;
   height:360px;
   margin-bottom:15px;
`;

const Container = styled('div')`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const LeftDiv = styled('div')`
  width: 60%;
  height: 100%;
  background-color: #006CEA;
  display:  flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const LeftDiv1 = styled('div')`
  width: 100%;
  height: 10%;
  margin-top: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftDiv2 = styled('div')`
  width: 100%;
  height: 50%;
`;

const LeftDiv3 = styled('div')`
  width: 100%;
  height: 10%;
  margin-bottom: 10%
`;

const RightDiv = styled('div')`
  width: 40%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteTextTypography = styled(Typography)`
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  margin-top: 18px;
  margin-left: 10px;
`;

const WhiteTextTypographyPara = styled(Typography)`
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  margin-top: 18px;
  margin-left: 10px;
`;


function SignIn() {
  return (
    <React.Fragment>
      <Container>

        <LeftDiv>

          <LeftDiv1>

            <ImageWrapper>
              <img src="/favicon-white.svg" alt="logo-image" />
              <WhiteTextTypography variant="h2" align="center">
                Luminary Health
              </WhiteTextTypography>
            </ImageWrapper>

          </LeftDiv1>

          <LeftDiv2>

            <ImageWrapperLeft>
              <img src="/signInCardImges.svg" alt="logo-image" />
            </ImageWrapperLeft>

          </LeftDiv2>

          <LeftDiv3>

            <WhiteTextTypography  variant="h2" align="center">
              Luminary Health Providers
            </WhiteTextTypography>

            <WhiteTextTypographyPara variant="h2" align="center">
              Manage all of your Luminary Referrals in one place
            </WhiteTextTypographyPara>




          </LeftDiv3>


        </LeftDiv>


        <RightDiv>
          <Wrapper>
            <Typography component="h3" variant="h3" align="center">
              Login to your account
            </Typography>

            <SignInWrapper>
              <SignInComponent />
            </SignInWrapper>
          </Wrapper>
        </RightDiv>

      </Container>
    </React.Fragment>
  );
}

export default SignIn;
