import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";
import { useResetPasswordMutation } from "../../redux/slices/authSlice";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fade } from "@mui/material";

import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
  Snackbar,
} from "@mui/material";
import { spacing } from "@mui/system";

const Alert = styled(MuiAlert)(spacing, {
  backgroundColor: "white", 
  borderRadius: "10px", 
});
const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const SnackbarWrapper = styled.div`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: #01E17B; // Change border color to green
    border-bottom-left-radius: 10px; // Match border radius of the alert
    border-bottom-right-radius: 10px; // Match border radius of the alert
  }
`;

function ResetPassword() {
  const navigate = useNavigate();
  const [resetPassword, { data, isSuccess, isError }] = useResetPasswordMutation();
  let formData = new FormData();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<any>("success");

  useEffect(() => {
    if (isSuccess) {
      setSnackbarMessage("Email Sent Successfully");
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
    } if (isError) {
      setSnackbarMessage("Invalid Email");
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
    }
  }, [isSuccess, isError])

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>

      <Formik
        initialValues={{
          email: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            let email = values.email;
            formData.append("email", email);
            resetPassword(formData); //TODO add toast for email successfully sent

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
              <SnackbarWrapper>
                <Alert mt={2} mb={1} severity="warning">
                  {errors.submit}
                </Alert>
              </SnackbarWrapper>
            )}
            <TextField
              type="email"
              name="email"
              label="Email"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Send password
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
          horizontal: "center",
        }}
      >
        {/* Render the Alert component with the appropriate severity */}
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
            <span style={{ fontSize: "14px" }}>Email Sent Successfully <br /></span>
            <span style={{ fontSize: "12px" }}>
              Reset Password link have been sent to <br />
              your email successfully
            </span>
          </Alert>
        </SnackbarWrapper>
      </Snackbar>

    </>

  );
}

export default ResetPassword;
