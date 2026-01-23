import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LogIn, Mail, Lock, Apple } from "lucide-react";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .required("Password is required"),
});

export function LoginForm({ className, ...props }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Login submitted:", values);
      resetForm();
    },
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full max-w-md mx-auto p-4",
        className
      )}
      {...props}
    >
      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <LogIn className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription className="text-base">
            Choose your preferred login method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <button
              onClick={() => {
                console.log(formik);
              }}
            >
              test
            </button>
            <FieldGroup>
              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full hover:bg-accent transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Apple
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full hover:bg-accent transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>
              </div>

              <FieldSeparator className="my-2">
                <span className="text-muted-foreground text-sm">
                  Or continue with
                </span>
              </FieldSeparator>

              {/* Email Field */}
              <Field>
                <FieldLabel htmlFor="email" className="text-sm font-medium">
                  <Mail className="w-4 h-4 inline-block mr-1" />
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={cn(
                    "transition-all",
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  )}
                />
                {formik.touched.email && formik.errors.email && (
                  <FieldDescription className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span className="text-xs">⚠️</span>
                    {formik.errors.email}
                  </FieldDescription>
                )}
              </Field>

              {/* Password Field */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="password"
                    className="text-sm font-medium"
                  >
                    <Lock className="w-4 h-4 inline-block mr-1" />
                    Password
                  </FieldLabel>
                  <a
                    href="#"
                    className="text-sm text-primary hover:underline underline-offset-4 font-medium"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={cn(
                    "transition-all",
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  )}
                />
                {formik.touched.password && formik.errors.password && (
                  <FieldDescription className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span className="text-xs">⚠️</span>
                    {formik.errors.password}
                  </FieldDescription>
                )}
              </Field>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={formik.isSubmitting || !formik.isValid}
                size="lg"
              >
                {formik.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Login
                  </span>
                )}
              </Button>

              <FieldDescription className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="#" className="text-primary hover:underline font-medium">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary hover:underline font-medium">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
