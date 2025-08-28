# DEFINIÇÃO DA ARQUITETURA DE ROTEAMENTO DE PÁGINAS

## Visão Geral

O projeto utiliza o **padrão declarativo do React Router** com uma estrutura de roteamento baseada em arquivos, combinando a flexibilidade do React Router com a organização intuitiva de file-based routing.

## Estrutura de Pastas

```
src/pages/
├── (private)/          # Rotas privadas (requerem autenticação)
│   ├── layout.tsx      # Layout para páginas privadas
│   ├── routes.tsx      # Definição das rotas privadas
│   └── dashboard/      # Módulo dashboard
│       ├── layout.tsx  # Layout específico do dashboard
│       ├── page.tsx    # Página principal (/dashboard)
│       ├── routes.tsx  # Rotas do dashboard
│       └── users/      # Submódulo de usuários
│           ├── page.tsx        # Lista de usuários (/dashboard/users)
│           ├── routes.tsx      # Rotas dos usuários
│           └── [id]/
│               └── page.tsx    # Usuário específico (/dashboard/users/:id)
└── (public)/           # Rotas públicas
    ├── layout.tsx      # Layout para páginas públicas
    ├── page.tsx        # Página inicial (/)
    ├── route.tsx       # Definição das rotas públicas
    ├── login/
    │   └── page.tsx    # Página de login (/login)
    └── register/
        └── page.tsx    # Página de registro (/register)
```

## Convenções de Nomenclatura

### Arquivos de Página
- **`page.tsx`**: Componente da página que será renderizado na rota
- **`layout.tsx`**: Componente de layout que envolve as páginas filhas
- **`routes.tsx`**: Definição declarativa das rotas usando React Router

### Estrutura de Pastas
- **`(private)/`**: Agrupa rotas que requerem autenticação
- **`(public)/`**: Agrupa rotas públicas (sem autenticação)
- **`[id]/`**: Indica parâmetro dinâmico na rota (ex: `/users/:id`)

## Padrão de Implementação

### 1. Componentes de Página

Cada `page.tsx` deve exportar o componente como **default export**:

```tsx
// src/pages/(private)/dashboard/page.tsx
export function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Conteúdo da página */}
    </div>
  );
}
```

### 2. Layouts

Os layouts utilizam `<Outlet />` do React Router para renderizar páginas filhas:

```tsx
// src/pages/(private)/layout.tsx
import { Outlet } from "react-router";

export function PrivateLayout() {
  const isAuthenticated = true; // Lógica de autenticação

  if (!isAuthenticated) {
    return <div>Acesso negado</div>;
  }

  return (
    <div>
      {/* Header, sidebar, etc. */}
      <Outlet />
    </div>
  );
}
```

### 3. Definição de Rotas

As rotas são definidas declarativamente usando componentes `<Route>`:

```tsx
// src/pages/(private)/dashboard/routes.tsx
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
```

### 4. Rotas com Parâmetros

Para rotas dinâmicas, usa-se a sintaxe `:param`:

```tsx
// src/pages/(private)/dashboard/users/routes.tsx
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
```

### 5. Router Principal

O router principal organiza todas as rotas:

```tsx
// src/router.tsx
import { BrowserRouter, Routes } from "react-router";
import { PublicRoutes } from "./pages/(public)/route";
import { PrivateRoutes } from "./pages/(private)/routes";

const ROUTES: React.ReactNode[] = [
  <PublicRoutes />,
  <PrivateRoutes />
];

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map((route) => route)}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
```

## Mapeamento de Rotas

| URL | Arquivo | Descrição |
|-----|---------|-----------|
| `/` | `(public)/page.tsx` | Página inicial pública |
| `/login` | `(public)/login/page.tsx` | Página de login |
| `/register` | `(public)/register/page.tsx` | Página de registro |
| `/dashboard` | `(private)/dashboard/page.tsx` | Dashboard principal |
| `/dashboard/users` | `(private)/dashboard/users/page.tsx` | Lista de usuários |
| `/dashboard/users/:id` | `(private)/dashboard/users/[id]/page.tsx` | Detalhes do usuário |

## Vantagens do Padrão

1. **Organização Intuitiva**: A estrutura de pastas reflete diretamente as rotas da aplicação
2. **Separação de Responsabilidades**: Layouts, páginas e definições de rotas são separados
3. **Reutilização**: Layouts podem ser compartilhados entre múltiplas rotas
4. **Composição**: Rotas podem ser facilmente compostas e aninhadas
5. **Manutenibilidade**: Fácil localização e manutenção de componentes relacionados às rotas
6. **Escalabilidade**: Estrutura permite crescimento organizado da aplicação

## Benefícios da Abordagem Declarativa

- **Legibilidade**: As rotas são definidas de forma clara e declarativa
- **Composição**: Facilita a composição de rotas complexas
- **Reutilização**: Componentes de rota podem ser reutilizados
- **Manutenção**: Mudanças nas rotas são centralizadas nos arquivos `routes.tsx`
