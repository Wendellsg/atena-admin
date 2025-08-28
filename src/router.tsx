import { BrowserRouter, Routes } from "react-router";
import { PublicRoutes } from "./pages/(public)/route";

const ROUTES: React.ReactNode[] = [<PublicRoutes />];

function Router() {
  return (
    <BrowserRouter>
      <Routes>{ROUTES.map((route) => route)}</Routes>
    </BrowserRouter>
  );
}

export default Router;
