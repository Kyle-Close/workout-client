import { createRootRoute, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { Container } from "@mui/material";
import CustomAppBar from "../components/CustomAppBar";

const PUBLIC_ROUTES = ["/", "/login"];

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    if (PUBLIC_ROUTES.includes(location.pathname)) return;
    const token = localStorage.getItem("token");
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
  component: RootLayout,
});

function RootLayout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  // Landing page has its own full-width layout
  if (isLandingPage) {
    return (
      <>
        <CustomAppBar />
        <Outlet />
      </>
    );
  }

  return (
    <>
      <CustomAppBar />
      <Container maxWidth="sm" disableGutters>
        <Outlet />
      </Container>
    </>
  );
}
