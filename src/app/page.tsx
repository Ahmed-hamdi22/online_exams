"use client";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from "@/components/logout/Logout";



export default function Signin() {
  return (
    <div className="container vh-95 mb-5 mt-5 d-flex bg-light  w-75 ">
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
          <h3 className="">  Welcome to Elevate </h3>
          <div className="">  <Logout/></div>
        </div>
      </div>
    </div>
  );
};


