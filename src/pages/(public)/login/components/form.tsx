import { z } from "zod";

const loginFormSchema = z.object({
  document: z
    .string()
    .min(11, {
      message: "O documento deve ter 11 caracteres.",
    })
    .max(11, {
      message: "O documento deve ter 11 caracteres.",
    }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }).max(100, {
    message: "A senha deve ter no máximo 100 caracteres.",
  }),
});
