import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="mx-auto w-full max-w-md md:max-w-lg bg-gradient-to-b from-gray-800 to-black text-white rounded-xl p-8 md:p-10 shadow-lg">
        {/* Logo Section */}
        <div className="mb-6 flex justify-center bg-gray-700 p-4 rounded-lg shadow-md">
          <span className="inline-block w-32 md:w-40">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title Section */}
        <h2 className="text-center text-xl md:text-2xl font-bold leading-tight">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-sm md:text-base text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-400 transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        {/* Form Section */}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
          <Input
            label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
            })}
            className="bg-gray-700"
          />
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
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
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
