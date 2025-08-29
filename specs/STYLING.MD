# DEFINIÇÃO DA ARQUITETURA DE ESTILIZAÇÃO

## Visão Geral

O projeto utiliza uma arquitetura de estilização moderna baseada em **Tailwind CSS v4** e **ShadCN/UI**, oferecendo uma abordagem utility-first com componentes pré-estilizados e sistema de design consistente.

## Stack de Tecnologias

### Core
- **Tailwind CSS v4**: Framework CSS utility-first
- **ShadCN/UI**: Sistema de componentes baseado em Radix UI
- **CSS Variables**: Para temas dinâmicos
- **TypeScript**: Para tipagem segura dos componentes

### Dependências
```json
{
  "@tailwindcss/vite": "^4.1.12",
  "tailwindcss": "^4.1.12",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1",
  "tw-animate-css": "^1.3.7",
  "@radix-ui/react-slot": "^1.2.3",
  "lucide-react": "^0.542.0"
}
```

## Configuração

### Vite Configuration
```typescript
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### ShadCN Configuration
```json
// components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Path Aliases
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Sistema de Design

### Design Tokens (CSS Variables)

O projeto utiliza um sistema de design tokens baseado em CSS Variables com suporte completo a temas claro e escuro:

```css
/* src/index.css */
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... mais tokens */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... versões dark dos tokens */
}
```

### Categorias de Tokens

#### Cores Semânticas
- `background` / `foreground`: Cores base da aplicação
- `primary` / `primary-foreground`: Cor principal e seu contraste
- `secondary` / `secondary-foreground`: Cor secundária
- `muted` / `muted-foreground`: Cores suavizadas
- `accent` / `accent-foreground`: Cor de destaque
- `destructive`: Cor para ações destrutivas

#### Cores de Interface
- `border`: Bordas padrão
- `input`: Campos de entrada
- `ring`: Anéis de foco
- `card` / `card-foreground`: Cartões
- `popover` / `popover-foreground`: Popovers

#### Cores de Gráficos
- `chart-1` até `chart-5`: Paleta para visualizações

#### Cores de Sidebar
- `sidebar-*`: Tokens específicos para componentes de sidebar

#### Bordas e Raios
- `radius`: Raio base para bordas arredondadas
- `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`: Variações

## Estrutura de Componentes

### Organização de Pastas

```
src/
├── components/
│   └── ui/              # Componentes base do ShadCN
│       ├── button.tsx   # Componente Button
│       ├── card.tsx     # Componente Card
│       ├── input.tsx    # Componente Input
│       └── ...          # Outros componentes UI
├── lib/
│   └── utils.ts         # Utilitários (cn function)
└── pages/
    └── **/components/   # Componentes específicos de páginas
```

### Componentes UI Base

Os componentes seguem o padrão ShadCN com:

1. **Variants System**: Usando `class-variance-authority`
2. **Composable**: Múltiplos componentes por arquivo quando apropriado
3. **Accessible**: Baseados em Radix UI
4. **Customizable**: Props de className para extensibilidade

#### Exemplo: Button Component
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90",
        outline: "border bg-background shadow-xs hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Utility Function

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

A função `cn` combina:
- **clsx**: Para concatenação condicional de classes
- **tailwind-merge**: Para resolver conflitos entre classes Tailwind

## Padrões de Uso

### 1. Importação de Componentes
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
```

### 2. Customização com className
```tsx
<Button className="w-full" variant="outline" size="lg">
  Botão Customizado
</Button>
```

### 3. Composição de Componentes
```tsx
export function LoginCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Email" />
        <Button className="w-full">Entrar</Button>
      </CardContent>
    </Card>
  );
}
```

### 4. Componentes Específicos de Página
```tsx
// src/pages/(public)/login/components/card.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginCard() {
  return (
    <Card>
      <Input />
      <Button>Entrar</Button>
    </Card>
  );
}
```

## Temas e Dark Mode

### Implementação
O projeto suporta temas através de CSS Variables e a classe `.dark`:

```css
/* Tema claro (padrão) */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
}

/* Tema escuro */
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}
```

### Base Styles
```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Animações

O projeto inclui `tw-animate-css` para animações pré-definidas do CSS.

## Ícones

Utiliza **Lucide React** como biblioteca de ícones padrão, configurada no ShadCN.

## Comandos Úteis

### Adicionar Novos Componentes ShadCN
```bash
npx shadcn@latest add [component-name]
```

### Desenvolvimento
```bash
yarn dev    # Servidor de desenvolvimento
yarn build  # Build para produção
yarn lint   # Verificação de código
```

## Vantagens da Arquitetura

1. **Consistency**: Sistema de design unificado via tokens
2. **Maintainability**: Componentes reutilizáveis e bem organizados
3. **Performance**: Classes utilitárias otimizadas do Tailwind
4. **Accessibility**: Componentes baseados em Radix UI
5. **Developer Experience**: TypeScript + autocomplete + path aliases
6. **Theming**: Suporte nativo a temas claro/escuro
7. **Scalability**: Estrutura permite crescimento organizado
8. **Customization**: Fácil customização via props e className

## Boas Práticas

1. **Use a função `cn`** para combinar classes condicionalmente
2. **Prefira componentes UI base** antes de criar novos
3. **Mantenha componentes específicos** em suas respectivas pastas de página
4. **Use tokens semânticos** ao invés de cores hardcoded
5. **Aproveite as variants** dos componentes para diferentes estados
6. **Mantenha a acessibilidade** usando componentes baseados em Radix
