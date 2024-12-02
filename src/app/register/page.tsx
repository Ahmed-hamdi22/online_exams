
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required."),
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    email: Yup.string().email("Invalid email.").required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters, including uppercase, lowercase, number, and special character."
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match.")
      .required("Password confirmation is required."),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone number must be an Egyptian number.")
      .required("Phone is required."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setErrorMessage(""); 
      try {
        const response = await fetch("https://exam.elevateegy.com/api/v1/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message || "Registration failed. Please try again.");
        } else {
          // toast.success("success")
         
          resetForm();
          router.push("/login");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setErrorMessage("An error occurred. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container min-vh-95 m-5d-flex   w-100">
      <div className="row">
        <div className="col-md-6 image shadow">
          <div className="text-center">
            <h2 className="text-md-start ms-5">Welcome to</h2>
            <h1 className="text-primary text-md-start ms-5">Elevate</h1>
            <p className="text-md-start ms-5 text">
              Quidem autem voluptatibus qui quaerat aspernatur architecto natus
            </p>
            <img
              src="/bro.png"
              className="img-fluid mt-5"
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center  mt-2 ">
          <div className="w-75">
            <div className="d-flex justify-content-end mt-3">
            
              <Link className="me-3 p-1" href={"/login"}>
                sign in
              </Link>
              <Link className="border bottom-1 rounded-xl p-1 " href={"/register"}>Register</Link>
            </div>

            <form className="mt-4" onSubmit={formik.handleSubmit}>
              <h3 className="text mb-3">Sign up</h3>

              <div className="mb-3">
                <input
                  placeholder="User Name"
                  type="text"
                  name="username"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-danger">{formik.errors.username}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-danger">{formik.errors.firstName}</div>
                )}
              </div>

              <div className="mb-3">
                <input
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-danger">{formik.errors.lastName}</div>
                )}
              </div>

              <div className="mb-3">
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger">{formik.errors.password}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  placeholder="Confirm Password"
                  type="password"
                  name="rePassword"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rePassword}
                />
                {formik.touched.rePassword && formik.errors.rePassword && (
                  <div className="text-danger">{formik.errors.rePassword}</div>
                )}
              </div>

              <div className="mb-3">
                <input
                  placeholder="Phone"
                  type="text"
                  name="phone"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-danger">{formik.errors.phone}</div>
                )}
              </div>

              {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-4 mt-3"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Registering..." : "Register"}
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
          <img width={20} height={20} alt="fasbook" src={"/Vector.png"} />
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
          <img width={20} height={20} alt="Apple" src={"/Logo (1).png"} />
        </div>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

           
      








      

       
    



  


  



  
  







