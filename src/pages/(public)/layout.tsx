import { Outlet } from "react-router";

export function PublicLayout() {
  return (
    <div>
      <h2>PUBLIC PAGES</h2>
      <Outlet />
    </div>
  );
}
