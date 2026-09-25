import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingBasket,
} from "lucide-react";

import {
  sendSignupOtp,
  verifySignupOtp,
} from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SIGNUP / OTP
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      // =========================
      // STEP 1 - SEND OTP
      // =========================

      if (!otpSent) {
        const response = await sendSignupOtp(
          formData.email
        );

        console.log(
          "Signup OTP response:",
          response.data
        );

        setOtpSent(true);

        setMessage(
          "OTP sent successfully. Please check your email."
        );

        return;
      }

      // =========================
      // STEP 2 - VERIFY OTP
      // =========================

      if (!otp.trim()) {
        setMessage("Please enter the OTP.");
        return;
      }

      const response = await verifySignupOtp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        otp: otp,
      });

      console.log(
        "Signup verification response:",
        response.data
      );

      setMessage(
        "Account created successfully!"
      );

      // Go to login
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error(
        "Signup error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-10">

      <div className="mx-auto flex min-h-[90vh] max-w-6xl items-center justify-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2"
        >

          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="hidden bg-gradient-to-br from-orange-500 to-orange-600 p-10 text-white md:flex md:flex-col md:justify-center">

            <ShoppingBasket size={55} />

            <h1 className="mt-6 text-4xl font-bold">
              Join Grocify 🌱
            </h1>

            <p className="mt-4 text-lg leading-8 text-orange-50">
              Create your account and discover fresh fruits,
              vegetables and quality products.
            </p>

            <p className="mt-6 text-sm text-orange-100">
              Fresh products. Easy shopping. Delivered to your
              doorstep.
            </p>

          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="p-7 sm:p-10">

            {/* Mobile Logo */}

            <div className="mb-6 flex items-center justify-center gap-2 md:hidden">

              <ShoppingBasket
                size={30}
                className="text-orange-500"
              />

              <span className="text-2xl font-bold text-orange-500">
                Grocify
              </span>

            </div>

            {/* Heading */}

            <div className="text-center">

              <h2 className="text-3xl font-bold text-gray-900">
                Create Account 🌱
              </h2>

              <p className="mt-2 text-gray-500">
                {otpSent
                  ? "Verify your email to create your account"
                  : "Join Grocify and start shopping"}
              </p>

            </div>

            {/* =========================
                FORM
            ========================= */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* =========================
                  NAME
              ========================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={otpSent}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />

                </div>

              </div>

              {/* =========================
                  EMAIL
              ========================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={otpSent}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />

                </div>

              </div>

              {/* =========================
                  PASSWORD
              ========================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={otpSent}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-12 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    disabled={otpSent}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-orange-500 disabled:cursor-not-allowed"
                  >

                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}

                  </button>

                </div>

              </div>

              {/* =========================
                  OTP
              ========================= */}

              {otpSent && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Enter OTP
                  </label>

                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6)
                      )
                    }
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-lg tracking-[0.4em] outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />

                  <p className="mt-2 text-center text-xs text-gray-500">
                    OTP has been sent to your email.
                  </p>

                </motion.div>

              )}

              {/* =========================
                  BUTTON
              ========================= */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{
                  scale: loading ? 1 : 1.02,
                }}
                whileTap={{
                  scale: loading ? 1 : 0.98,
                }}
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3.5 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Please wait..."
                  : otpSent
                    ? "Verify OTP & Create Account"
                    : "Create Account"}

              </motion.button>

            </form>

            {/* =========================
                MESSAGE
            ========================= */}

            {message && (

              <p
                className={`mt-4 text-center text-sm font-medium ${
                  message.toLowerCase().includes(
                    "success"
                  )
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>

            )}

            {/* =========================
                LOGIN
            ========================= */}

            <p className="mt-7 text-center text-sm text-gray-500">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-orange-500 transition hover:text-orange-600"
              >
                Login
              </Link>

            </p>

            {/* =========================
                BACK HOME
            ========================= */}

            <div className="mt-5 text-center">

              <Link
                to="/"
                className="text-sm text-gray-400 transition hover:text-orange-500"
              >
                ← Back to Home
              </Link>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Signup;