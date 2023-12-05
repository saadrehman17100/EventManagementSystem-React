"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../state/state";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter();
  const { user, loginUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      await loginUser({
        UserEmail: email,
        UserPassword: password,
      });
      toast.success("Welcome");
      if (user?.UserRole === "admin") {
        router.push("/add-event");
      }
      router.push("/view-event");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-black borde-2 border-gray-500 px-10 py-10 shadow-2xl shadow-white">
        <div className="text-white font-bold">Login</div>
        <div className="flex flex-col space-y-5">
          <label>Email</label>
          <input
            type="email"
            id="signup-email"
            className="w-full px-10 py-2 text-left bg-transparent text-[#cccccc] placeholder-gray-600 focus:outline-none border-2 border-gray-500 rounded-lg"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            id="signup-password"
            className="w-full px-10 py-2 text-left bg-transparent text-[#cccccc] placeholder-gray-600 focus:outline-none border-2 border-gray-500 rounded-lg"
            placeholder="Enter your Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="hover:shadow-blue-600/40 mt-10 rounded-xl text-center  bg-gradient-to-r   from-[#6c72cb] to-[#cb69c1] px-9 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">
          <button onClick={handleClick}>Login In</button>
        </div>
        <h1 className="text-white text-center pt-2">
          Does not have an account ?{" "}
          <Link className="text-pink-700 underline" href={"/sign-up"}>
            Register
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default SignIn;
