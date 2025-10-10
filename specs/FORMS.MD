# DEFINIÇÃO DA ARQUITETURA DE FORMULÁRIOS

## Visão Geral

O projeto utiliza uma arquitetura de formulários moderna baseada em **React Hook Form**, **Zod** para validação e **ShadCN/UI** para componentes, oferecendo uma experiência consistente, performática e type-safe em toda a aplicação.

## Stack de Tecnologias

### Core
- **React Hook Form**: Biblioteca para gerenciamento de formulários performática
- **Zod**: Schema validation library para TypeScript
- **@hookform/resolvers**: Integração entre React Hook Form e Zod
- **ShadCN/UI**: Componentes de formulário pré-estilizados

### Dependências
```json
{
  "react-hook-form": "^7.62.0",
  "@hookform/resolvers": "^5.2.1",
  "zod": "^4.1.5"
}
```

## Estrutura Padrão de Formulário

### 1. Schema de Validação (Zod)

Defina o schema de validação no início do arquivo:

```tsx
import { z } from "zod";

const formSchema = z.object({
  field1: z
    .string()
    .min(1, { message: "Campo obrigatório." })
    .max(100, { message: "Máximo 100 caracteres." }),
  field2: z
    .string()
    .email({ message: "E-mail inválido." }),
});

export type FormValues = z.infer<typeof formSchema>;
```

### 2. Estrutura do Componente

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function CustomForm({
  onSubmit,
  className,
}: {
  onSubmit: (data: FormValues) => void;
  className?: string;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      field1: "",
      field2: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        {/* Campos do formulário */}
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
```

## Padrões de Implementação

### 1. Campos de Formulário

Use sempre a estrutura FormField para consistência:

```tsx
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Label do Campo</FormLabel>
      <FormControl>
        <Input placeholder="Placeholder" {...field} />
      </FormControl>
      <FormDescription>Descrição opcional do campo.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

### 2. Campo de Senha com Toggle

Para campos de senha, implemente o toggle de visibilidade:

```tsx
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Senha</FormLabel>
          <FormControl>
            <div className="flex item-center gap-2">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                {...field}
              />
              <Button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
          </FormControl>
          <FormDescription>Informe sua senha.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
```

### 3. Validações Comuns

#### CPF/CNPJ
```tsx
document: z
  .string()
  .min(11, { message: "O documento deve ter 11 caracteres." })
  .max(11, { message: "O documento deve ter 11 caracteres." }),
```

#### E-mail
```tsx
email: z
  .string()
  .email({ message: "E-mail inválido." }),
```

#### Senha
```tsx
password: z
  .string()
  .min(6, { message: "A senha deve ter pelo menos 6 caracteres." })
  .max(100, { message: "A senha deve ter no máximo 100 caracteres." }),
```

#### Confirmação de Senha
```tsx
const formSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});
```

### 4. Estados de Loading

Implemente estados de loading durante o submit:

```tsx
export function FormWithLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {/* campos */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
```

## Componentes de Formulário Disponíveis

### ShadCN/UI Components
- `Form`: Wrapper principal do formulário
- `FormField`: Container para cada campo
- `FormItem`: Container do item de formulário
- `FormLabel`: Label do campo
- `FormControl`: Wrapper do controle do campo
- `FormDescription`: Descrição opcional
- `FormMessage`: Mensagens de erro/validação
- `Input`: Campo de entrada de texto
- `Button`: Botão de ação

### Ícones (Lucide React)
- `Eye`: Mostrar senha
- `EyeClosed`: Ocultar senha
- Outros ícones conforme necessário

## Convenções de Nomenclatura

### Arquivos
- `form.tsx`: Componente principal do formulário
- `components/`: Subcomponentes específicos do formulário

### Types
- `FormValues`: Tipo inferido do schema Zod
- `{NomeForm}Values`: Para formulários específicos (ex: `LoginFormValues`)

### Funções
- `onSubmit`: Callback principal de submissão
- `{action}Form`: Nome do componente (ex: `LoginForm`, `RegisterForm`)

## Boas Práticas

### 1. Estrutura de Pastas
```
src/pages/feature/
├── page.tsx
└── components/
    ├── form.tsx
    └── other-components.tsx
```

### 2. Reutilização
- Extraia campos comuns em componentes separados
- Use schemas base para validações recorrentes
- Implemente hooks customizados para lógicas complexas

### 3. Acessibilidade
- Use labels descritivos
- Forneça descrições quando necessário
- Garanta que as mensagens de erro sejam claras

### 4. Performance
- Use React Hook Form para performance otimizada
- Evite re-renders desnecessários
- Implemente debounce em validações assíncronas quando necessário

### 5. Tipagem
- Sempre use TypeScript para type safety
- Exporte types dos schemas para reutilização
- Use `z.infer` para inferir tipos automaticamente

## Exemplo de Referência

O formulário de login (`src/pages/(public)/login/components/form.tsx`) serve como exemplo padrão da implementação, demonstrando:

- Schema de validação com Zod
- Integração com React Hook Form
- Campo de senha com toggle
- Estrutura de componentes ShadCN/UI
- Tipagem TypeScript
- Tratamento de erros
- Estilização consistente

Este padrão deve ser seguido em todos os formulários da aplicação para manter consistência e qualidade do código.
