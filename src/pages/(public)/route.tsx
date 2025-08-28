import { Route } from "react-router";
import { PublicLayout } from "./layout";
import { LoginPage } from "./login/page";
import { LangePage } from "./page";
import { RegisterPage } from "./register/page";

export function PublicRoutes() {
  return (
    <Route element={<PublicLayout />}>
      <Route index element={<LangePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
  );
}
