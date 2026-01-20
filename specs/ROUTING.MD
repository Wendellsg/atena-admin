# DEFINIÇÃO DA ARQUITETURA DE ROTEAMENTO DE PÁGINAS

## Visão Geral

O projeto utiliza o **padrão declarativo do React Router** com uma estrutura de roteamento baseada em arquivos, combinando a flexibilidade do React Router com a organização intuitiva de file-based routing.

## Estrutura de Pastas

```
src/pages/
├── (private)/          # Rotas privadas (requerem autenticação)
│   ├── layout.tsx      # Layout para páginas privadas
│   └── dashboard/      # Módulo dashboard
│       ├── layout.tsx  # Layout específico do dashboard
│       ├── page.tsx    # Página principal (/dashboard)
│       └── users/      # Submódulo de usuários
│           ├── page.tsx        # Lista de usuários (/dashboard/users)
│           └── [id]/
│               └── page.tsx    # Usuário específico (/dashboard/users/:id)
└── (public)/           # Rotas públicas
    ├── layout.tsx      # Layout para páginas públicas
    ├── page.tsx        # Página inicial (/)
    ├── login/
    │   └── page.tsx    # Página de login (/login)
    └── register/
        └── page.tsx    # Página de registro (/register)
```

## Convenções de Nomenclatura

### Arquivos de Página

- **`page.tsx`**: Componente da página que será renderizado na rota
- **`layout.tsx`**: Componente de layout que envolve as páginas filhas

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

### 3. Definição Centralizada e Aninhada de Rotas

As rotas são definidas diretamente e de forma aninhada no arquivo `src/router.tsx`:

```tsx
// src/router.tsx
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
```

## Mapeamento de Rotas

| URL           | Arquivo                           | Descrição              |
| ------------- | --------------------------------- | ---------------------- |
| `/`           | `(public)/page.tsx`               | Página inicial pública |
| `/login`      | `(public)/login/page.tsx`         | Página de login        |
| `/register`   | `(public)/register/page.tsx`      | Página de registro     |
| `/cursos`     | `(private)/courses/page.tsx`      | cursos principal       |
| `/cursos/:id` | `(private)/courses/[id]/page.tsx` | Detalhes do usuário    |

## Vantagens do Padrão

## Vantagens da Nova Abordagem

1. **Centralização**: Todas as rotas são definidas em um único local (`src/router.tsx`)
2. **Organização Intuitiva**: Estrutura de pastas reflete as rotas, mas sem arquivos intermediários
3. **Composição e Aninhamento**: Rotas aninhadas diretamente via JSX
4. **Manutenção Simplificada**: Mudanças nas rotas são feitas em um único arquivo
5. **Escalabilidade**: Estrutura permite crescimento organizado da aplicação

## Benefícios da Abordagem Declarativa

- **Legibilidade**: As rotas são definidas de forma clara e declarativa
- **Composição**: Facilita a composição de rotas complexas
- **Reutilização**: Componentes de rota podem ser reutilizados
- **Manutenção**: Mudanças nas rotas são centralizadas no arquivo `router.tsx`
