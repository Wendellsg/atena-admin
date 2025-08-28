import { Outlet } from "react-router";

export function PrivateLayout() {
  const isAuthenticated = true; // Simulação de autenticação

  if (!isAuthenticated) {
    return <div>Acesso negado</div>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
