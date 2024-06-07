import React, { useEffect } from "react";
import styled from "@emotion/styled";


import { Paper, Typography } from "@mui/material";

import { ReactComponent as Logo } from "../../vendor/logo.svg";
import SignInComponent from "../../components/auth/SignIn";
import { authRoutes } from "../../routes";
import { useLocation, useNavigate } from "react-router-dom";


const Brand = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 64px;
  height: 64px;
  margin-bottom: 32px;
  cursor: pointer;
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
   height: 100%;
   margin-bottom:15px;
`;

const Container = styled('div')`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const LeftDiv = styled('div')`
  width: 48%;
  height: 100vh;
  display:  flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const LeftDiv1 = styled('div')`
margin-top: 10%;
margin-bottom: 5%;
width: 100%;
`;

const LeftDiv2 = styled('div')`
height: 75%;
position: absolute;
bottom: 0;
left: 50%;
transform: translateX(-50%);
`;

const RightDiv = styled('div')`
  width: 52%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const RightDiv1 = styled('div')`
display: flex;
align-items: center;

margin-bottom: 40px;
`;

const RightDiv2 = styled('div')`
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
  font-size: 10px;
  font-size: 14px;
  margin-top: 18px;
  margin-left: 10px;
  font-weight: 400;
`;

const LeftInnerDiv = styled('div')`
background-color: #006CEA;
height: 100%;
width: 100%;
position: relative;
`;


function SignIn() {
  const handleLogoClick = () => {
    window.location.reload();
  };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=> {
    if(authRoutes.baseUrl.path === location.pathname){
      navigate(authRoutes.login.path)
    }
  }, [])

  return (
    <React.Fragment>
      <Container>

        <LeftDiv>
          <LeftInnerDiv>
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
                <img src="/login-img.svg" alt="logo-image" />
              </ImageWrapperLeft>
            </LeftDiv2>
          </LeftInnerDiv>
        </LeftDiv>


        <RightDiv>

          <div>
            <RightDiv2>

              <Wrapper>
                <RightDiv1>
                  <a href="/" onClick={handleLogoClick}>
                    <img src="/favicon.svg" alt="logo-image" style={{ height: '40px' }} />
                  </a>
                  
                  <a href="/" style={{textDecoration: "none"}}>
                  <Typography variant="h2" align="center" style={{ fontSize: "24px", color: "#181C32", fontWeight: "500", marginLeft: "10px" }}>
                    Luminary Health
                  </Typography>
                  </a>
                </RightDiv1>

                <SignInWrapper>
                  <SignInComponent />
                </SignInWrapper>
              </Wrapper>
            </RightDiv2>
          </div>

        </RightDiv>

      </Container>
    </React.Fragment>
  );
}

export default SignIn;
