"use client";
import React, { useEffect, useState } from "react";
import { login } from "../controller/login";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import useStore from "../hook/useStore";

export default function Login() {
  const router = useRouter();
  const { setAuth, setAccInfo, auth } = useStore();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (auth.token) {
      router.push("/");
    }
  }, [auth.token, router]);

  async function loginSubmit(event) {
    event.preventDefault();
    const response = await login(form);
    console.log(response);

    if (response.res_code == "0000") {
      setAuth({ token: response.res_data?.token });
      setAccInfo({ info: form.email });

      Swal.fire({
        title: "Success!",
        text: "เข้าสู่ระบบสำเร็จ",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/");
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "การเข้าสู่ระบบล้มเหลว",
        icon: "error",
        confirmButtonText: "เข้าสู่ระบบอีกครั้ง",
      });
    }
  }
  return (
    <>
      <div className="container mx-auto px-50 ">
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
          <div className="container max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Login
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white font-bold py-2 rounded hover:bg-emerald-700 transition duration-300"
                onClick={loginSubmit}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
