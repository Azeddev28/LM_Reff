import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";
import { useConfirmPasswordMutation, useValidatePasswordMutation } from "../../redux/slices/authSlice";

import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import { useParams } from "react-router-dom";

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
  const [confirmPassword,{data:confirmPasswordData, isSuccess:confirmPasswordSuccess, isError:confirmPasswordError}] = useConfirmPasswordMutation();
  const [validatePassword,{ data, isSuccess, isError }]= useValidatePasswordMutation();

  let formData = new FormData();

  useEffect(() => {
    validatePassword(params);
  }, []);

  useEffect(()=>{
    if(isError){
      navigate('/404')
    }
  },[isError])

  useEffect(()=>{
    if(confirmPasswordSuccess){
      navigate("/auth/sign-in") //TODO show toast for password reset successfully
    }
  },[confirmPasswordSuccess])

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword:"",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .min(5, "Password must be at least 8 characters long")
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
          let confirmPasswordParams={
            body, 
            uid:params?.uid,
            token:params?.token,
          }
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
            type="password"
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
              style: { fontSize: 12, fontWeight: 600, color: "#7E8299" }
            }}
          />
          <TextField
            type="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={values.confirmPassword}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            fullWidth
            helperText={touched.confirmPassword && errors.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
            InputLabelProps={{
              style: { fontSize: 12, fontWeight: 600, color: "#7E8299" }
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
  );
}

export default ConfirmPassword;
