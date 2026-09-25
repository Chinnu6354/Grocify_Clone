import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ShoppingBasket } from "lucide-react";
import { sendForgotPasswordOtp } from "../services/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await sendForgotPasswordOtp(email);

      console.log(
        "Forgot password OTP response:",
        response.data
      );

      setMessage(
        "OTP sent successfully. Please check your email."
      );

      setTimeout(() => {
        navigate("/forgot-password/verify", {
          state: { email },
        });
      }, 800);

    } catch (error) {

      console.error(
        "Forgot password error:",
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
          className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2"
        >

          {/* Left Side */}

          <div className="hidden bg-gradient-to-br from-orange-500 to-orange-600 p-10 text-white md:flex md:flex-col md:justify-center">

            <ShoppingBasket size={55} />

            <h1 className="mt-6 text-4xl font-bold">
              Grocify 🌱
            </h1>

            <p className="mt-4 text-lg leading-8 text-orange-50">
              Forgot your password?
              Don't worry, we'll help you get
              back into your account.
            </p>

          </div>

          {/* Right Side */}

          <div className="p-7 sm:p-10">

            {/* Mobile Logo */}

            <div className="mb-8 flex items-center justify-center gap-2 md:hidden">

              <ShoppingBasket
                size={30}
                className="text-orange-500"
              />

              <span className="text-2xl font-bold text-orange-500">
                Grocify
              </span>

            </div>

            <div className="text-center">

              <h2 className="text-3xl font-bold text-gray-900">
                Forgot Password?
              </h2>

              <p className="mt-2 text-gray-500">
                Enter your email to receive an OTP
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Email */}

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
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />

                </div>

              </div>

              {/* Button */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3.5 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Sending OTP..."
                  : "Send OTP"}
              </motion.button>

            </form>

            {/* Message */}

            {message && (
              <p
                className={`mt-4 text-center text-sm font-medium ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            {/* Back to Login */}

            <p className="mt-7 text-center text-sm text-gray-500">

              Remember your password?{" "}

              <Link
                to="/login"
                className="font-semibold text-orange-500 transition hover:text-orange-600"
              >
                Login
              </Link>

            </p>

            {/* Back Home */}

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

export default ForgotPassword;