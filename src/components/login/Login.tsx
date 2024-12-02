

import { signIn } from "next-auth/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";




export default function LoginForm() {
  const validationSchema = yup.object({
    email: yup.string()
      .email("Invalid email address")
      .required("Email is required"),
      password: yup.string()
      .required("Password is required.")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters, including uppercase, lowercase, number, and special character."
      ),
  });
  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    const response = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });

    
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting}) => (
        <Form autoComplete="off">
          <h3 className="text mb-3">Sign in</h3>
          <div className="mb-3">
            <Field
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
              autoComplete="off"
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

      
          <div className="mb-3">
            <Field
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              autoComplete="off"
            />
            <ErrorMessage name="password" component="div" className="text-danger" />
            <Link href="/forgotPassword" className="d-block text-end mt-2">
              Recover password?
            </Link>
          </div>

      
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-4 mt-3"
            disabled={isSubmitting}
          >
            Sign In
          </button>

        
          <div className="text-center mt-3">
            <p>Or continue with</p>
            <div className="d-flex justify-content-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/home" })}
                className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
              >
                <img width={20} height={20} alt="google" src={"/Logo Google.png"} />
              </div>
              <div
                onClick={() => signIn("facebook", { callbackUrl: "/home" })}
                className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
              >
                <img width={20} height={20} alt="facebook" src={"/Vector.png"} />
              </div>
              <div
                onClick={() => signIn("twitter", { callbackUrl: "/home" })}
                className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
              >
                <img width={20} height={20} alt="twitter" src={"/Logo.png"} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/home" })}
                className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
              >
                <img width={20} height={20} alt="github" src={"/Logo (1).png"} />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
