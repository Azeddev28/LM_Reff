import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  InputAdornment,
  CircularProgress,
  Fade,
} from "@mui/material";
import { spacing } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { authRoutes } from "../../routes";

interface ConfirmPasswordBody {
  new_password1: string;
  new_password2: string;
}

const SnackbarWrapper = styled.div`
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: #01e17b;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const Alert = styled(MuiAlert)(spacing, {
  backgroundColor: "white",
  borderRadius: "10px",
});

const SnackbarContainer = styled.div`
  margin-right: 20px;
`;

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px; /* Set a fixed width to ensure consistency */
`;

function ConfirmPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const [
    confirmPassword,
    {
      data: confirmPasswordData,
      isSuccess: confirmPasswordSuccess,
      isError: confirmPasswordError,
      error: confirmPasswordMutationError,
    },
  ] = useConfirmPasswordMutation();
  const [validatePassword, { data, isSuccess, isError }] =
    useValidatePasswordMutation();

  let formData = new FormData();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<any>("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  }, [params, validatePassword]);

  useEffect(() => {
    if (isError) {
      navigate(authRoutes.notFound.path);
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (confirmPasswordSuccess) {
      setSnackbarMessage("Password Changed Successfully");
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setIsSubmitting(false);
      setTimeout(() => {
        navigate(authRoutes.login.path);
      }, 1000);
    }
    if (confirmPasswordError) {
      //@ts-ignore      
      setSnackbarMessage(confirmPasswordMutationError?.data?.new_password2 ? confirmPasswordMutationError?.data?.new_password2 : "Something Went Wrong, Try again Later");
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setIsSubmitting(false);
    }
  }, [confirmPasswordError, confirmPasswordSuccess, confirmPasswordMutationError, navigate]);

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
            .matches(
              /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
              "Password must contain at least one numeric digit, one alphabetic character, one special character and must be 8 character long"
            )
            .min(8, "Password must be at least 8 characters long")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setIsSubmitting(true); 
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
            setIsSubmitting(false); 
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
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
              <ButtonContent>
                {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
              </ButtonContent>
            </Button>
          </form>
        )}
      </Formik>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        TransitionComponent={Fade}
        message={snackbarMessage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <SnackbarContainer>
          <SnackbarWrapper>
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
          </SnackbarWrapper>
        </SnackbarContainer>
      </Snackbar>
    </>
  );
}

export default ConfirmPassword;
