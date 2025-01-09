import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md md:max-w-lg mx-auto bg-gradient-to-b from-gray-800 to-black text-white rounded-xl p-8 md:p-10 shadow-lg">
        {/* Logo Section */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-24 md:w-32">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title Section */}
        <h2 className="text-center text-xl md:text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm md:text-base text-gray-400">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-400 transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        {/* Form Section */}
        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
            className="bg-gray-700"
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
            className="bg-gray-700"
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition-transform transform active:scale-95"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
