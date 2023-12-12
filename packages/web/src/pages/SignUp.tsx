import { Box, Typography, TextField, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

export const SignUp = () => {
  const navigate = useNavigate();
  const setToken = useStore((state) => state.setToken);
  const { mutate: signUp } = useMutation({
    mutationFn: api.signUp,
    onSuccess(data) {
      setToken(data.token);
      navigate("/");
    },
  });
  return (
    <Box>
      <Typography variant="h1">Sign Up</Typography>
      <Formik
        initialValues={{
          email: "loup.peluso@gmail.com",
          password: "password",
          passwordConfirmation: "password",
        }}
        onSubmit={(data) => {
          signUp(data);
        }}
      >
        {({ getFieldProps, handleSubmit }) => {
          return (
            <>
              <TextField {...getFieldProps("email")} />
              <TextField {...getFieldProps("password")} />
              <TextField {...getFieldProps("passwordConfirmation")} />
              <Button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Sign Up
              </Button>
            </>
          );
        }}
      </Formik>
      <Button
        variant="text"
        onClick={() => {
          navigate("/sign-in");
        }}
      >
        Already have an account?
      </Button>
    </Box>
  );
};
