import { Box, Button, Input } from "@mui/joy";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
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
      Sign In
      <Formik
        initialValues={{ email: "loup.peluso@gmail.com", password: "password" }}
        onSubmit={(data) => {
          signIn(data);
        }}
      >
        {({ getFieldProps, handleSubmit }) => {
          return (
            <>
              <Input {...getFieldProps("email")} />
              <Input {...getFieldProps("password")} />
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
        onClick={() => {
          navigate("/sign-up");
        }}
      >
        Don't have an account?
      </Button>
    </Box>
  );
};
