import { Box, Input, Button } from "@mui/joy";
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
      Sign Up
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
              <Input {...getFieldProps("email")} />
              <Input {...getFieldProps("password")} />
              <Input {...getFieldProps("passwordConfirmation")} />
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
        onClick={() => {
          navigate("/sign-in");
        }}
      >
        Already have an account?
      </Button>
    </Box>
  );
};
