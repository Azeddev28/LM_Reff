import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useLoginMutation } from "../../redux/slices/authSlice";
import { useLazyGetProfileQuery } from "../../redux/slices/referralAPiSlice";
import {
  setAuthenticated,
  setAccessToken,
  setUserName,
} from "../../redux/slices/authSlice";
import {
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../redux/slices/authSlice";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(({}) => ({
  margin: "16px 0px",
}));

function SignIn() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  console.log("isAuthenticated", isAuthenticated);
  console.log("accessToken", accessToken);
  const [login, { data: loginData, isSuccess: loginSuccessFull }] =
    useLoginMutation();

  const [getProfile, { data: profileData, isSuccess: getProfileSuccess }] =
    useLazyGetProfileQuery();
  console.log("PRofileData", profileData);
  console.log("getProfileSuccesss", getProfileSuccess);
  useEffect(() => {
    if (loginSuccessFull) {
      console.log("Make Login");
      dispatch(setAuthenticated(true));
      dispatch(setAccessToken(loginData.access));
      localStorage.setItem("access", loginData.access);
      getProfile();
    }
  }, [loginSuccessFull]);

  useEffect(() => {
    console.log("get Profile Success  useEffect Running");
    console.log("Profile dttaaEffect", profileData);

    if (getProfileSuccess) {
      console.log("Profile Data", profileData);
      // dispatch(user);
    }
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          console.log("Login Button click");
          login({ email: values.email, password: values.password });
        } catch (error) {
          console.log("Error", error);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="email"
            name="email"
            label="Email Address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign in
          </Button>
          <Button
            component={Link}
            to="/auth/reset-password"
            fullWidth
            color="primary"
          >
            Forgot password
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
