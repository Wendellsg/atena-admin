import { Route } from "react-router";
import { DashBoardLayout } from "./layout";
import { DashboardPage } from "./page";
import { UsersRoutes } from "./users/routes";

export function DashRoutes() {
  return (
    <Route path="/dashboard" element={<DashBoardLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="users/*" element={<UsersRoutes />} />
    </Route>
  );
}
