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
import { Link, useNavigate } from "react-router-dom"; // 1. استدعاء useNavigate
import { useFormik } from "formik";
import * as Yup from "yup";
import { LogIn, Mail, Lock } from "lucide-react";
import { useContext, useState } from "react"; // 2. استدعاء hooks
import { AuthContext } from "@/components/context/AuthContext"; // 3. استدعاء الكونتكست

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    // .email("Invalid email address") // ممكن نوقف دي مؤقتاً عشان نجرب username زي emilys
    .required("Email or Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export function LoginForm({ className, ...props }) {
  const { login } = useContext(AuthContext); // 4. هات دالة اللوجين
  const navigate = useNavigate(); // 5. عشان التنقل
  const [error, setError] = useState(null); // 6. لعرض الأخطاء

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError(null); // امسح أي خطأ قديم

        // بنبعت البيانات للموتور (Context)
        await login(values.email, values.password);

        console.log("Logged in successfully!");

        // لو نجح، وديه الصفحة الرئيسية
        navigate("/");
      } catch (err) {
        // لو فشل اعرض الرسالة (زي Invalid credentials)
        setError(err.message || "Something went wrong");
      } finally {
        setSubmitting(false); // وقف التحميل
      }
    },
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full max-w-md mx-auto p-4",
        className,
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
            {/* 🔴 مكان عرض الخطأ لو الباسورد غلط */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center font-medium animate-in fade-in slide-in-from-top-2">
                ⚠️ {error}
              </div>
            )}

            <FieldGroup>
              {/* Social Login Buttons (شكل بس) */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="w-full">
                  Google
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  Apple
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
                  Email / Username
                </FieldLabel>
                <Input
                  id="email"
                  type="text" // خليناه text عشان يقبل username
                  name="email"
                  placeholder="john@example.com or emilys"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={cn(
                    "transition-all",
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "",
                  )}
                />
                {formik.touched.email && formik.errors.email && (
                  <FieldDescription className="text-red-500 text-sm mt-1">
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
                      : "",
                  )}
                />
                {formik.touched.password && formik.errors.password && (
                  <FieldDescription className="text-red-500 text-sm mt-1">
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
    </div>
  );
}
