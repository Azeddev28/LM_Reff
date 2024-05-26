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
  width: 48%;
  height: 98vh;
  background-color: #006CEA;
  display:  flex;
  flex-direction: column;

  margin-left: 0.5vw;
  margin-top: 1vh;
`;

const LeftDiv1 = styled('div')`
margin-top: 10%;
margin-bottom: 5%;
width: 100%;

`;

const LeftDiv2 = styled('div')`

`;

const RightDiv = styled('div')`
  width: 50%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RightDiv1 = styled('div')`
display: flex;
align-items: center;
margin-left: -200px;
margin-bottom: 40px;
`;

const RightDiv2 = styled('div')`
background-color: red;
`;

const WhiteTextTypography = styled(Typography)`
  color: white;
  font-family: 'Inter';
  font-size: 30px;
  margin-top: 18px;
  margin-left: 10px;
`;

const WhiteTextTypographyPara = styled(Typography)`
  color: white;
  font-family: 'Inter';
  font-size: 12px;
  margin-top: 18px;
  margin-left: 10px;
  font-weight: 400;
`;


function SignIn() {
  return (
    <React.Fragment>
      <Container>

        <LeftDiv>

          {/* <LeftDiv1>

            <ImageWrapper>
              <img src="/favicon-white.svg" alt="logo-image" />
              <WhiteTextTypography variant="h2" align="center">
                Luminary Health
              </WhiteTextTypography>
            </ImageWrapper>

          </LeftDiv1> */}

          <LeftDiv1>
            <WhiteTextTypography variant="h2" align="center">
              Luminary Health Providers
            </WhiteTextTypography>

            <WhiteTextTypographyPara variant="h2" align="center">
              Manage all of your Luminary Referrals in one place
            </WhiteTextTypographyPara>
          </LeftDiv1>

          <LeftDiv2>
          <ImageWrapperLeft>
              <img src="/login-img.svg" alt="logo-image" style={{height: '73vh', backgroundColor: ""}}/>
            </ImageWrapperLeft>
          </LeftDiv2>


        </LeftDiv>


        <RightDiv>

          <RightDiv1>
              <img src="/favicon.svg" alt="logo-image" style={{height: '40px'}}/>
              <Typography variant="h2" align="center" style={{fontSize: "20px", color: "black"}}>
                Luminary Health
              </Typography>
          </RightDiv1>

          <RightDiv2>
             
          <Wrapper>
            <Typography component="h3" variant="h3" align="left" style={{fontSize: "20px", marginBottom: "10px"}}>
              Hi, nice to see you!
            </Typography>

            <SignInWrapper>
              <SignInComponent />
            </SignInWrapper>
          </Wrapper>
          </RightDiv2>

         
        </RightDiv>

      </Container>
    </React.Fragment>
  );
}

export default SignIn;
