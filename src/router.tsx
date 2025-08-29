import { BrowserRouter, Route, Routes } from "react-router";
import { DashBoardLayout } from "./pages/(private)/dashboard/layout";
import { DashboardPage } from "./pages/(private)/dashboard/page";
import { UserPage } from "./pages/(private)/dashboard/users/[id]/page";
import { UsersPage } from "./pages/(private)/dashboard/users/page";
import { PrivateLayout } from "./pages/(private)/layout";
import { PublicLayout } from "./pages/(public)/layout";
import { LoginPage } from "./pages/(public)/login/page";
import { LangePage } from "./pages/(public)/page";
import { RegisterPage } from "./pages/(public)/register/page";

function Router() {
  return (
    <BrowserRouter>
      aa
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LangePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<DashBoardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="users/*">
              <Route path="/dashboard/users">
                <Route index element={<UsersPage />} />
                <Route path=":id" element={<UserPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
