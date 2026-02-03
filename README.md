# Atena Admin

Painel administrativo da plataforma Atena - sistema de gerenciamento e administração para controle completo do projeto.

## Sobre o Projeto

Atena Admin é uma aplicação frontend desenvolvida em React e TypeScript, projetada para fornecer uma interface administrativa intuitiva e responsiva para gerenciamento da plataforma de ensino online Atena. Este painel permite que administradores gerenciem usuários, cursos, conteúdos e configurações do sistema.

## Tecnologias

Este projeto foi iniciado com `yarn create vite` e utiliza:

### Core

- **React** com TypeScript
- **Vite** para build e desenvolvimento
- **React Router v7** para roteamento declarativo

### Estilização

- **Tailwind CSS v4** - Framework CSS utility-first
- **ShadCN/UI** - Sistema de componentes baseado em Radix UI
- **Lucide React** - Biblioteca de ícones

### Qualidade de Código

- **ESLint** para linting
- **TypeScript** para tipagem estática

## Estrutura do Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Atena Admin    │    │   Backend API   │    │   Atena Web     │
│  (Admin Panel)  │◄──►│     (Atena)     │◄──►│  (Plataforma)   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Database      │
                       │                 │
                       └─────────────────┘
```

## Funcionalidades Administrativas

- **Gerenciamento de Usuários**: Criação, edição e exclusão de usuários
- **Gerenciamento de Cursos**: Administração completa de cursos e módulos
- **Gestão de Conteúdo**: Upload e organização de materiais didáticos
- **Monitoramento**: Acompanhamento de métricas e desempenho da plataforma
- **Configurações**: Controle de configurações gerais do sistema
- **Relatórios**: Geração de relatórios e análises administrativas
- **Controle de Acesso**: Gerenciamento de permissões e roles

## Arquitetura Técnica

### Roteamento

- **Padrão Declarativo**: Roteamento baseado em React Router v7
- **File-Based Structure**: Organização intuitiva de páginas e rotas
- **Layouts Aninhados**: Suporte a layouts públicos e privados
- **Rotas Dinâmicas**: Parâmetros de URL tipados

### Design System

- **Tokens CSS**: Sistema de design com variáveis CSS para temas
- **Componentes Modulares**: Biblioteca baseada em ShadCN/UI + Radix
- **Responsividade**: Design mobile-first com Tailwind CSS
- **Acessibilidade**: Componentes acessíveis por padrão

### Developer Experience

- **TypeScript**: Tipagem estática completa
- **Path Aliases**: Imports organizados com `@/`
- **Hot Reload**: Desenvolvimento com Vite
- **Linting**: ESLint configurado para React e TypeScript

## Desenvolvimento

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Yarn package manager

### Instalação

```bash
# Clone o repositório
git clone git@github.com:a-supernova/atena-admin.git
cd atena-admin

# Instale as dependências
yarn install

# Inicie o servidor de desenvolvimento
yarn dev
```

### Scripts Disponíveis

```bash
# Desenvolvimento
yarn dev

# Build para produção
yarn build

# Preview da build de produção
yarn preview

# Lint do código
yarn lint
```

### Comandos ShadCN/UI

```bash
# Adicionar novos componentes UI
npx shadcn@latest add [component-name]

# Exemplos:
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

## Estrutura de Pastas

```
src/
├── assets/          # Assets estáticos (imagens, ícones)
├── components/      # Componentes React reutilizáveis
│   └── ui/          # Componentes base do ShadCN/UI
├── constants/       # Constantes da aplicação
├── lib/             # Utilitários (cn function, etc.)
├── pages/           # Páginas da aplicação (file-based routing)
│   ├── (public)/    # Rotas públicas
│   ├── (private)/   # Rotas privadas (autenticadas)
│   └── **/components/ # Componentes específicos de páginas
├── services/        # Serviços de API e integrações
├── hooks/           # Custom hooks
├── utils/           # Funções utilitárias
├── types/           # Definições de tipos TypeScript
└── styles/          # Estilos globais e temas
```

### Sistema de Estilização

O projeto utiliza uma arquitetura de estilização moderna com:

- **Design System**: Baseado em tokens CSS com suporte a temas claro/escuro
- **Componentes Reutilizáveis**: Sistema ShadCN/UI com variants e composição
- **Utility-First**: Classes Tailwind CSS para estilização rápida e consistente
- **Acessibilidade**: Componentes baseados em Radix UI com foco em a11y

> 🎨 **Documentação Completa**: Para detalhes sobre o sistema de design, componentes e padrões de estilização, consulte o arquivo [`/specs/STYLING.MD`](./specs/STYLING.MD).

### Padrão de Roteamento File-Based

O projeto utiliza o padrão declarativo do React Router, com definição centralizada e aninhada das rotas diretamente no arquivo `src/router.tsx`. A estrutura de pastas segue o padrão file-based, mas todas as rotas são configuradas em um único local, facilitando manutenção e visualização.

Exemplo de mapeamento de rotas:

- `/` → `pages/(public)/page.tsx`
- `/login` → `pages/(public)/login/page.tsx`
- `/register` → `pages/(public)/register/page.tsx`
- `/dashboard` → `pages/(private)/dashboard/page.tsx`
- `/dashboard/users` → `pages/(private)/dashboard/users/page.tsx`
- `/dashboard/users/:id` → `pages/(private)/dashboard/users/[id]/page.tsx`

Cada rota deve ter um arquivo `page.tsx` que exporta o componente da página como default.

> 📋 **Documentação Completa**: Para detalhes completos sobre a arquitetura de roteamento, convenções e padrões implementados, consulte o arquivo [`/specs/ROUTING.MD`](./specs/ROUTING.MD).

### Padrão de Formulários

O projeto utiliza uma arquitetura moderna para formulários baseada em **React Hook Form**, **Zod** para validação e componentes **ShadCN/UI**, proporcionando uma experiência consistente, performática e type-safe.

**Principais características:**

- **Validação Declarativa**: Schemas Zod para validação robusta
- **Performance Otimizada**: React Hook Form com minimal re-renders
- **Type Safety**: Integração completa com TypeScript
- **Componentes Consistentes**: Padrão uniforme usando ShadCN/UI
- **Acessibilidade**: Labels, descrições e mensagens de erro adequadas

**Exemplo de implementação:**

```tsx
// Schema de validação
const loginSchema = z.object({
  document: z.string().min(11).max(11),
  password: z.string().min(6).max(100),
});

// Componente do formulário
export function LoginForm({
  onSubmit,
}: {
  onSubmit: (data: LoginFormValues) => void;
}) {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { document: "", password: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name="document" />
        <FormField name="password" />
        <Button type="submit">Entrar</Button>
      </form>
    </Form>
  );
}
```

> 📝 **Documentação Completa**: Para padrões de implementação, validações comuns, boas práticas e exemplos detalhados, consulte o arquivo [`/specs/FORMS.MD`](./specs/FORMS.MD).

### Gerenciamento de Estado e API

Utilizamos **TanStack Query** para gerenciamento de estado do servidor e cache, em conjunto com **Axios** para requisições HTTP type-safe.

**Principais características:**

- **Cache Automático**: Gerenciamento inteligente de dados com stale time e refetch
- **Mutações Otimizadas**: Atualizações otimistas e invalidação de cache pós-mutação
- **Arquitetura em Camadas**: Separação clara entre API client, services e hooks
- **Type Safety**: Tipagem completa de requests e responses

**Exemplo de consumo:**

```tsx
// Hook customizado
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

// Uso no componente
const { data, isLoading } = useCourses();
```

> 🔄 **Documentação Completa**: Para especificações detalhadas sobre fetching, caching, mutações e padrões da API, consulte o arquivo [`/specs/DATA_FETCHING.MD`](./specs/DATA_FETCHING.MD).

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Contato

Para mais informações sobre o projeto, entre em contato com a equipe de desenvolvimento.

---

**Nota**: Este é o painel administrativo da plataforma Atena. Para a aplicação principal voltada aos alunos, veja o projeto [atena-web](../atena-web). Para o backend da API, consulte o projeto [atena](../atena).
