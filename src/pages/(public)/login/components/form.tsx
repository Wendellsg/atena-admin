import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
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
import { useState } from "react";
const loginFormSchema = z.object({
  document: z
    .string()
    .min(11, {
      message: "O documento deve ter 11 caracteres.",
    })
    .max(11, {
      message: "O documento deve ter 11 caracteres.",
    }),
  password: z
    .string()
    .min(6, {
      message: "A senha deve ter pelo menos 6 caracteres.",
    })
    .max(100, {
      message: "A senha deve ter no máximo 100 caracteres.",
    }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm({
  onSubmit,
  className,
}: {
  onSubmit: (data: LoginFormValues) => void;
  className?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      document: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF | CNPJ</FormLabel>
              <FormControl>
                <Input placeholder="CPF | CNPJ" {...field} />
              </FormControl>
              <FormDescription>Informe seu CPF ou CNPJ.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
