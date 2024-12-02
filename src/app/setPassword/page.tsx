
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";


export default function SetNewPassword() {
  const router = useRouter();
  const [email, setEmail] = useState(""); 
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState({ type: "", text: "" }); 

 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

   
    if (!email || !newPassword) {
      setMessage({ type: "error", text: "Please enter both email and new password." });
      return;
    }

    setLoading(true);

    try {
     
      const success = await updatePassword(email, newPassword);

      if (success) {
        setMessage({
          type: "success",
          text: "Password updated successfully! Redirecting...",
        });

      }
    } catch (error: any) {
      console.error("Password update failed:", error);
      setMessage({
        type: "error",
        text: error.message || "Password update failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

 
  const updatePassword = async (email: string, newPassword: string) => {
    try {
      const res = await fetch("https://exam.elevateegy.com/api/v1/auth/resetPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

     
      if (res.ok) {
        setMessage({ type: "success", text: "Code verified successfully! Redirecting..." });
        router.push("/login");
      }
      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.message || "An error occurred";
        throw new Error(errorMessage);
       
      }

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to set new password.");
      }

      return true; 
    } catch (error: any) {
      console.error("Error in updatePassword:", error);
      throw error; 
    }
  };

  return (
    <div className="container min-vh-75 mb-5 mt-5 d-flex  w-75">
    <div className="row">

    <div className="col-md-6 image shadow  ">
          <div className="text-center">
            <h2 className="text-md-start ms-5">Welcome to</h2>
            <h1 className="text-primary text-md-start ms-5">Elevate</h1>
            <p className="text-md-start ms-5 text">
            Quidem autem voluptatibus qui quaerat aspernatur architecto natus
            </p>
            <img
             src="/bro.png"
              alt="Illustration"
              className="img-fluid "
              style={{ maxHeight: '300px' }}
            />
          </div>
        </div>
   

     <div className="col-md-6 d-flex align-items-center justify-content-center">
      <div className="w-75">
      <div className="d-flex justify-content-end mt-3 mb">
              <Link className="me-3" href={"/login"}>signin</Link>
              <Link  href={"/register"}>Register</Link>
            </div>
            {message.text && (
        <div className={`alert ${message.type === "error" ? "alert-danger" : "alert-success"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
      <h3 className="text mb-3">Set a Password</h3>
        <div className="mb-3">
          
          <input
          
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 rounded-4 mt-3" disabled={loading}>
          {loading ? "Setting Password..." : "Set New Password"}
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
