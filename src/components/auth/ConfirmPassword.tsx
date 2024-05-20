import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";
import { useResetPasswordMutation } from "../../redux/slices/authSlice";

import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";

// import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

function ConfirmPassword() {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  let formData = new FormData();

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword:"",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
          password: Yup.string()
          .min(5, "Password must be at least 5 characters long")
          .required("Password is required"),
          confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), undefined], "Passwords must match")
          .required("Password is required"),
})}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log('values', values)
        try {
            
        //   let password = values.email;
        //   formData.append("email", email);
        //   resetPassword(formData);
          navigate("/auth/sign-in");
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
            type="password"
            name="password"
            label="Enter Your Password"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <TextField
            type="confirmPassword"
            name="confirmPassword"
            label="Re Enter Your Password"
            value={values.confirmPassword}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            fullWidth
            helperText={touched.confirmPassword && errors.confirmPassword}
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
            Verify
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default ConfirmPassword;
