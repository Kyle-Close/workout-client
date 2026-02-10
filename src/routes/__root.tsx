import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Container } from "@mui/material";
import CustomAppBar from "../components/CustomAppBar";

export const Route = createRootRoute({
  component: () => (
    <>
      <CustomAppBar />
      <Container maxWidth="sm" disableGutters>
        <Outlet />
      </Container>
    </>
  ),
});
