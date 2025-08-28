# Iris Web

Um serviço de front-end web para gerenciamento de insights de investimentos financeiros.

## Sobre o Projeto

O Iris Web é uma interface web desenvolvida para um sistema completo de análise de investimentos que permite aos usuários:

- **Criar conta e autenticação**: Sistema de registro e login de usuários
- **Integração com API da B3**: Conexão direta com a API da Bolsa de Valores B3 para obtenção de dados financeiros em tempo real
- **Processamento de dados**: Os dados financeiros são processados para gerar insights inteligentes sobre investimentos
- **Gerenciamento de conexões**: Interface para administrar e monitorar as conexões de API e clientes
- **Multi-client**: A API backend serve dados não apenas para este front-end, mas também para outros clientes

## Tecnologias

Este projeto foi iniciado com `yarn create vite` e utiliza:

- **React** com TypeScript
- **Vite** para build e desenvolvimento
- **ESLint** para qualidade de código

## Estrutura do Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Iris Web      │    │   Backend API   │    │   API B3        │
│   (Frontend)    │◄──►│                 │◄──►│                 │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │  Outros Clients │
                       │                 │
                       └─────────────────┘
```

## Funcionalidades

### Para Usuários
- Dashboard de investimentos personalizado
- Visualização de dados financeiros em tempo real
- Insights e recomendações baseadas em análise de dados
- Gerenciamento de portfólio

### Para Administradores
- Monitoramento de conexões ativas
- Gerenciamento de usuários
- Configuração de integrações
- Análise de uso do sistema

## Desenvolvimento

### Pré-requisitos
- Node.js (versão 16 ou superior)
- Yarn package manager

### Instalação

```bash
# Clone o repositório
git clone git@github.com:a-supernova/iris-web.git
cd iris-web

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

## Estrutura de Pastas

```
src/
├── assets/          # Assets estáticos (imagens, ícones)
├── components/      # Componentes React reutilizáveis
├── constants/       # Constantes da aplicação
├── pages/          # Páginas da aplicação (file-based routing)
│   ├── admin/      # /admin -> page.tsx
│   ├── users/      # /users -> page.tsx, /users/[id] -> [id]/page.tsx
│   └── ...         # Estrutura baseada em rotas de arquivo
├── services/       # Serviços de API e integrações
├── hooks/          # Custom hooks
├── utils/          # Funções utilitárias
├── types/          # Definições de tipos TypeScript
└── styles/         # Estilos globais e temas
```

### Padrão de Roteamento File-Based

As páginas seguem o padrão de roteamento declarativo do React Router baseado em arquivos:

- `/` → `pages/(public)/page.tsx`
- `/login` → `pages/(public)/login/page.tsx`
- `/register` → `pages/(public)/register/page.tsx`
- `/dashboard` → `pages/(private)/dashboard/page.tsx`
- `/dashboard/users` → `pages/(private)/dashboard/users/page.tsx`
- `/dashboard/users/[id]` → `pages/(private)/dashboard/users/[id]/page.tsx`

Cada rota deve ter um arquivo `page.tsx` que exporta o componente da página como default.

> 📋 **Documentação Completa**: Para detalhes completos sobre a arquitetura de roteamento, convenções e padrões implementados, consulte o arquivo [`/specs/ROUTING.MD`](./specs/ROUTING.MD).

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