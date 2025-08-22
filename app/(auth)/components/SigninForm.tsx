"use client";

import { signinAction } from "@/actions/auth.action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema, SignInType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SigninForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const signupForm = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInType) => {
    startTransition(async () => {
      const res = await signinAction(values);
      if (res.error) {
        setError(res.error);
      } else {
        toast.success("Vienvenido");
        signupForm.reset();
        router.push("/");
      }
    });
  };
  return (
    <div className="rounded-lg shadow-lg p-4">
      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="email" className="text-sm font-medium ">
                  Correo
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="on"
                    required
                    {...field}
                    className="w-full px-3 py-2"
                    placeholder="tu@email.com"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="password" className="text-sm font-medium ">
                  Contraseña
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    id="password"
                    autoComplete="off"
                    required
                    {...field}
                    className="w-full px-3 py-2  "
                    placeholder="••••••••"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-400" />
              </FormItem>
            )}
          />

          <Button
            disabled={isPending}
            className="w-full font-medium py-2 px-4 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-default"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </Form>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <Terminal />
          <AlertTitle>¡Atención!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
export default SigninForm;
