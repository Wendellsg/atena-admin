import { BrowserRouter, Route, Routes } from "react-router";
import { CoursesLayout } from "./pages/(private)/cursos/layout";
import { PrivateLayout } from "./pages/(private)/layout";
import { PublicLayout } from "./pages/(public)/layout";
import { LoginPage } from "./pages/(public)/login/page";
import { LangePage } from "./pages/(public)/page";
import { RegisterPage } from "./pages/(public)/register/page";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LangePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<PrivateLayout />}>
          <Route path="/cursos" element={<CoursesLayout />}>
            <Route index element={<CoursesPage />} />
            <Route path="/cursos">
              <Route index element={<CoursesPage />} />
              <Route path="/cursos/:id" element={<CoursePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
