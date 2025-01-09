import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="w-full block">
        <Header />
        <main>
          <div className="text-3xl font-bold m-2 ">Unleash Your Curiosity</div>

          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
