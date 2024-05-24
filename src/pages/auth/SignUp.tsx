import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Paper, Typography } from "@mui/material";

import { ReactComponent as Logo } from "../../vendor/logo.svg";
import SignUpComponent from "../../components/auth/SignUp";



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


const WhiteTextTypography = styled(Typography)`
  color: white;
  font-family: 'Inter';
  font-size: 20px;
  margin-top: 18px;
  margin-left: 10px;
`;

const WhiteTextTypographyPara = styled(Typography)`
  color: white;
  font-family: 'Inter';
  font-size: 10px;
  margin-top: 18px;
  margin-left: 10px;
`;


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

function SignUp() {
  return (
    // <React.Fragment>
    //   <Brand />
    //   <Wrapper>
    //     <Helmet title="Sign Up" />

    //     <Typography component="h1" variant="h4" align="center" gutterBottom>
    //       Get started
    //     </Typography>
    //     <Typography component="h2" variant="body1" align="center">
    //       Start creating the best possible user experience for you customers
    //     </Typography>

    //     <SignUpComponent />
    //   </Wrapper>
    // </React.Fragment>

    <React.Fragment>
      <Container>
        <LeftDiv>
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
              <img src="/login-img.svg" alt="logo-image" style={{ height: '73vh' }} />
            </ImageWrapperLeft>
          </LeftDiv2>
        </LeftDiv>


        <RightDiv>
          <Wrapper>
            <Helmet title="Sign Up" />

            <Typography component="h1" variant="h4" align="center" gutterBottom>
              Get started
            </Typography>
            <Typography component="h2" variant="body1" align="center">
              Start creating the best possible user experience for you customers
            </Typography>

            <SignUpComponent />
          </Wrapper>
        </RightDiv>

      </Container>
    </React.Fragment>
  );
}

export default SignUp;
