import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignIn, SignUp, Home, Budget, Welcome } from "./pages";
import { Protected } from "./helpers";
import { Account } from "./pages/Account";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  {
    path: "/",
    element: <Protected />,
    children: [
      { index: true, element: <Home /> },
      { path: "/:budgetId/budget", element: <Budget /> },
      { path: "/:budgetId/accounts/:accountId", element: <Account /> },
      { path: "/welcome", element: <Welcome /> },
    ],
  },
]);
const theme = createTheme({
  typography: {
    fontFamily: ["Satoshi", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#212121",
    },
  },
});

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <RouterProvider router={router} />
          </CssBaseline>
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
