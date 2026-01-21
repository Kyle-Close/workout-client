import { createRootRoute, Outlet } from "@tanstack/react-router";
import CustomAppBar from "../components/CustomAppBar";

export const Route = createRootRoute({
  component: () => (
    <>
      <CustomAppBar />
      <Outlet />
    </>
  ),
});
