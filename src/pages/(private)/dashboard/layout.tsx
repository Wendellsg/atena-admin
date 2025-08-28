import { Outlet } from "react-router";

export function DashBoardLayout() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Outlet />
    </div>
  );
}
