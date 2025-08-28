import { Route } from "react-router";
import { DashRoutes } from "./dashboard/routes";
import { PrivateLayout } from "./layout";

export function PublicRoutes() {
  return (
    <Route element={<PrivateLayout />}>
      <DashRoutes />
    </Route>
  );
}
