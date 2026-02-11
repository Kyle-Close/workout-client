import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { Container } from "@mui/material";
import CustomAppBar from "../components/CustomAppBar";

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/login") return;
    const token = localStorage.getItem("token");
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => (
    <>
      <CustomAppBar />
      <Container maxWidth="sm" disableGutters>
        <Outlet />
      </Container>
    </>
  ),
});
