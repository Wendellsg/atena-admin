import { Card } from "@/components/ui/card";
import { LoginForm, type LoginFormValues } from "./form";

export function LoginCard() {
  async function handleLogin(data: LoginFormValues) {
    // Call your login API here
  }

  return (
    <Card>
      <LoginForm onSubmit={handleLogin} />
    </Card>
  );
}
