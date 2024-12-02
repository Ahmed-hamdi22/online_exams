"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


const Logout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    try {
      await signOut({ redirect: false });

      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");

      router.push("/login");
      toast.success("Logout successful.");
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={logout}
        disabled={loading}
        className="bg-red-800 m-1 p-2 text-white rounded-md"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default Logout;
