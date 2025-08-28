import { Route } from "react-router";
import { UserPage } from "./[id]/page";
import { UsersPage } from "./page";

export function UsersRoutes() {
  return (
    <Route path="/dashboard/users">
      <Route index element={<UsersPage />} />
      <Route path=":id" element={<UserPage />} />
    </Route>
  );
}
