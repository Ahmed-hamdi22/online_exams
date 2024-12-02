

"use client";
import LoginForm from "@/components/login/Login";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Signin() {
  return (
    <div className="container vh-100 d-flex w-95">
      <div className="row ">
        <div className="col-md-6 image shadow ">
          <div className="text-center">
            <h2 className="text-md-start ms-5">Welcome to</h2>
            <h1 className="text-primary text-md-start ms-5">Elevate</h1>
            <p className="text-md-start ms-5 text">
            Quidem autem voluptatibus qui quaerat aspernatur architecto natus
            </p>
            <img
             src="/bro.png"
              alt="Illustration"
              className="img-fluid"
              style={{ maxHeight: '300px' }}
            />
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <div className="d-flex justify-content-end mb-5">
             
            <Link className="me-3 p-1" href={"/login"}>
                sign in
              </Link>
              <Link className="border bottom-1 rounded-xl p-1 " href={"/register"}>Register</Link>
            </div>
           
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};



