import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  useConfirmPasswordMutation,
  useValidatePasswordMutation,
} from "../../redux/slices/authSlice";

import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
  Snackbar,
  IconButton,
  InputAdornment
} from "@mui/material";
import { spacing } from "@mui/system";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility"; 
import VisibilityOff from "@mui/icons-material/VisibilityOff"; 

interface ConfirmPasswordBody {
  new_password1: string;
  new_password2: string;
}

// import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

function ConfirmPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const [
    confirmPassword,
    {
      data: confirmPasswordData,
      isSuccess: confirmPasswordSuccess,
      isError: confirmPasswordError,
    },
  ] = useConfirmPasswordMutation();
  const [validatePassword, { data, isSuccess, isError }] =
    useValidatePasswordMutation();

  let formData = new FormData();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<any>("success");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const handleClickShowPassword = () => setShowPassword((show) => !show); 
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show); 

  const handleMouseDownPassword = (event: React.MouseEvent) => { 
    event.preventDefault();
  }; 

  useEffect(() => {
    validatePassword(params);
  }, []);

  useEffect(() => {
    if (isError) {
      navigate("/404");
    }
  }, [isError]);

  useEffect(() => {
    if (confirmPasswordSuccess) {
      setSnackbarMessage("Password Changed Successfully");
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      navigate("/auth/sign-in");
    }
    if (confirmPasswordError) {
      setSnackbarMessage("Something Went Wrong, Try again Later");
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
    }
  }, [confirmPasswordError, confirmPasswordSuccess]);

  return (
    <>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            let body: ConfirmPasswordBody = {
              new_password1: values?.password,
              new_password2: values?.confirmPassword,
            };
            (Object.keys(body) as (keyof ConfirmPasswordBody)[]).forEach(
              (key) => {
                if (body[key] !== undefined) {
                  formData.append(key, body[key] as string);
                }
              }
            );
            let confirmPasswordParams = {
              body,
              uid: params?.uid,
              token: params?.token,
            };
            confirmPassword(confirmPasswordParams);
          } catch (error: any) {
            const message = error.message || "Something went wrong";

            setStatus({ success: false });
            setErrors({ submit: message });
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
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type={showPassword ? "text" : "password"}  
              name="password"
              label="New Password"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
              InputLabelProps={{
                style: { fontSize: 12, fontWeight: 600, color: "#7E8299" },
              }}
              InputProps={{  
                endAdornment: (  
                  <InputAdornment position="end">  
                    <IconButton  
                      aria-label="toggle password visibility"  
                      onClick={handleClickShowPassword}  
                      onMouseDown={handleMouseDownPassword}  
                    > 
                      {showPassword ? <VisibilityOff /> : <Visibility />}  
                    </IconButton>  
                  </InputAdornment>  
                ),  
              }}  
            />
            <TextField
              type={showConfirmPassword ? "text" : "password"}  
              name="confirmPassword"
              label="Confirm Password"
              value={values.confirmPassword}
              error={Boolean(
                touched.confirmPassword && errors.confirmPassword
              )}
              fullWidth
              helperText={touched.confirmPassword && errors.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
              InputLabelProps={{
                style: { fontSize: 12, fontWeight: 600, color: "#7E8299" },
              }}
              InputProps={{  
                endAdornment: (  
                  <InputAdornment position="end">  
                    <IconButton  
                      aria-label="toggle confirm password visibility"  
                      onClick={handleClickShowConfirmPassword}  
                      onMouseDown={handleMouseDownPassword}  
                    >  
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}  
                    </IconButton>  
                  </InputAdornment>  
                ),  
              }}  
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Submit
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
        {/* Render the Alert component with the appropriate severity */}
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

export default ConfirmPassword;
