import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

export const SignIn = () => {
  const navigate = useNavigate();
  const setToken = useStore((state) => state.setToken);

  const { mutate: signIn } = useMutation({
    mutationFn: api.signIn,
    onSuccess(data) {
      setToken(data.token);
      navigate("/");
    },
  });
  return (
    <Box>
      <Typography variant="h1">Sign In</Typography>
      <Formik
        initialValues={{ email: "loup.peluso@gmail.com", password: "password" }}
        onSubmit={(data) => {
          signIn(data);
        }}
      >
        {({ getFieldProps, handleSubmit }) => {
          return (
            <>
              <TextField {...getFieldProps("email")} />
              <TextField {...getFieldProps("password")} />
              <Button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Sign In
              </Button>
            </>
          );
        }}
      </Formik>
      <Button
        variant="text"
        onClick={() => {
          navigate("/sign-up");
        }}
      >
        Don't have an account?
      </Button>
    </Box>
  );
};
