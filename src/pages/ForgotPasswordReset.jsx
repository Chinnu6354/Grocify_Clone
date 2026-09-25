import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  ShoppingBasket,
} from "lucide-react";
import { resetPassword } from "../services/api";

function ForgotPasswordReset() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Email not found. Please start again.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      const response = await resetPassword(
        email,
        newPassword,
        confirmPassword
      );

      console.log(
        "Password reset response:",
        response.data
      );

      setMessage(
        "Password reset successfully!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error(
        "Password reset error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
        "Failed to reset password"
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
              Reset Password 🔐
            </h1>

            <p className="mt-4 text-lg leading-8 text-orange-50">
              Create a new password for your
              Grocify account.
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
                Create New Password
              </h2>

              <p className="mt-2 text-gray-500">
                Enter your new password below
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* New Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  New Password
                </label>

                <div className="relative">

                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-12 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        !showNewPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
                  >
                    {showNewPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-12 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* Reset Button */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3.5 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Resetting Password..."
                  : "Reset Password"}
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

            <div className="mt-7 text-center">

              <Link
                to="/login"
                className="text-sm font-semibold text-orange-500 hover:text-orange-600"
              >
                ← Back to Login
              </Link>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default ForgotPasswordReset;