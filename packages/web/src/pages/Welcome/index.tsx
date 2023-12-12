import { Box, Button, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Spaces from "react-spaces";
import { api } from "../../api";
import { useStore } from "../../store";
import { Loading } from "../Loading";

export const WelcomeCreateBudget = () => {
  const queryClient = useQueryClient();
  const setBudgetId = useStore((state) => state.setBudgetId);
  const navigate = useNavigate();
  const { mutate: createBudget } = useMutation({
    mutationFn: api.saveBudget,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setBudgetId(data.id);
      navigate(`/${data.id}/budget`);
    },
  });
  return (
    <Spaces.ViewPort className="flex">
      <Spaces.Centered>
        <Box>Welcome to moneymate</Box>
        <Box>Please Create a budget:</Box>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values) => {
            createBudget(values);
          }}
        >
          {({ getFieldProps }) => (
            <Form>
              <TextField type="text" {...getFieldProps("name")} />
              <Button type="submit">Create</Button>
            </Form>
          )}
        </Formik>
      </Spaces.Centered>
    </Spaces.ViewPort>
  );
};

export const WelcomeSelectBudget = () => {
  const setBudgetId = useStore((state) => state.setBudgetId);
  const navigate = useNavigate();
  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: api.getBudgets,
  });

  return (
    <Spaces.ViewPort className="flex">
      <Spaces.Centered>
        <Box>Welcome to moneymate</Box>
        <Box>Please Select a budget:</Box>
        {budgets?.map((budget) => (
          <Button
            key={budget.id}
            onClick={() => {
              setBudgetId(budget.id);
              navigate(`/${budget.id}/budget`);
            }}
          >
            {budget.name}
          </Button>
        ))}
      </Spaces.Centered>
    </Spaces.ViewPort>
  );
};

export const Welcome = () => {
  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: api.getBudgets,
  });

  if (!budgets) return <Loading />;
  if (budgets.length === 0) return <WelcomeCreateBudget />;
  return <WelcomeSelectBudget />;
};
