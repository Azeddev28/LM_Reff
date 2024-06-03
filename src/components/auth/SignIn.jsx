import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { useLoginMutation } from "../../redux/slices/authSlice";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import { setAccessToken } from "../../redux/slices/authSlice";
import {
  Button,
  TextField as MuiTextField,
  Snackbar,
  CircularProgress
} from "@mui/material";
import { spacing } from "@mui/system";
import { useDispatch } from "react-redux";

const TextField = styled(MuiTextField)(({ }) => ({
  margin: "16px 0px",
}));

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px; /* Set a fixed width to ensure consistency */
`;

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    login,
    { data: loginData, isSuccess: loginSuccessFull, isError: loginError },
  ] = useLoginMutation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (loginSuccessFull) {
      dispatch(setAccessToken(loginData));
      setSnackbarMessage("Successfully logged in");
      setSnackbarOpen(true);
      setSnackbarSeverity("success"); 
      navigate('/dashboard'); // Navigate to the dashboard or any other page
    } else if (loginError) {
      setSnackbarMessage("Invalid credentials");
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
    }
  }, [loginSuccessFull, loginError, dispatch, loginData, navigate]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
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
            await login({ email: values.email, password: values.password });
            setStatus({ success: true });
            setSubmitting(false);
          } catch (error) {
            console.log("Error", error);
            setStatus({ success: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
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
              InputProps={{ style: { fontSize: '12px', fontWeight: "600", color: '#7E8299' } }}
              style={{ }}
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
              InputProps={{ style: { fontSize: '12px', fontWeight: "600", color: '#7E8299' } }}
              style={{ }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              <ButtonContent>
                {isSubmitting ? <CircularProgress size={24} /> : "Login"}
              </ButtonContent>
            </Button>
            <Button
              component={Link}
              to="/auth/reset-password"
              fullWidth
              color="primary"
            >
              Forgot password?
            </Button>
          </form>
        )}
      </Formik>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignIn;
