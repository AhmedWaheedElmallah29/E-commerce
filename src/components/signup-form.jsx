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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserPlus, Mail, Lock, User } from "lucide-react";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export function SignupForm({ className, ...props }) {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", values);
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
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Create your account
          </CardTitle>
          <CardDescription className="text-base">
            Enter your details below to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <FieldGroup>
              {/* Full Name Field */}
              <Field>
                <FieldLabel htmlFor="fullName" className="text-sm font-medium">
                  <User className="w-4 h-4 inline-block mr-1" />
                  Full Name
                </FieldLabel>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={cn(
                    "transition-all",
                    formik.touched.fullName && formik.errors.fullName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  )}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <FieldDescription className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span className="text-xs">⚠️</span>
                    {formik.errors.fullName}
                  </FieldDescription>
                )}
              </Field>

              {/* Email Field */}
              <Field>
                <FieldLabel htmlFor="email" className="text-sm font-medium">
                  <Mail className="w-4 h-4 inline-block mr-1" />
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
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

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel
                    htmlFor="password"
                    className="text-sm font-medium"
                  >
                    <Lock className="w-4 h-4 inline-block mr-1" />
                    Password
                  </FieldLabel>
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
                    <FieldDescription className="text-red-500 text-xs mt-1">
                      {formik.errors.password}
                    </FieldDescription>
                  )}
                </Field>
                {/* confirmPassword Fields */}

                <Field>
                  <FieldLabel
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    <Lock className="w-4 h-4 inline-block mr-1" />
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      "transition-all",
                      formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    )}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <FieldDescription className="text-red-500 text-xs mt-1">
                        {formik.errors.confirmPassword}
                      </FieldDescription>
                    )}
                </Field>
              </div>

              <FieldDescription className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-md">
                💡 Password must be at least 8 characters with uppercase letter
                and number
              </FieldDescription>

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
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 " />
                    Create Account
                  </span>
                )}
              </Button>

              <FieldDescription className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  Log in
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
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
