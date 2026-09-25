import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, ShoppingBasket } from "lucide-react";
import { verifyForgotPasswordOtp } from "../services/api";

function ForgotPasswordVerify() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Email not found. Please start again.");
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      const response = await verifyForgotPasswordOtp(
        email,
        otp
      );

      console.log(
        "OTP verification response:",
        response.data
      );

      setMessage(
        "OTP verified successfully!"
      );

      setTimeout(() => {
        navigate("/forgot-password/reset", {
          state: { email },
        });
      }, 800);

    } catch (error) {

      console.error(
        "OTP verification error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
        "Invalid or expired OTP"
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
              Verify OTP 🔐
            </h1>

            <p className="mt-4 text-lg leading-8 text-orange-50">
              Enter the verification code sent
              to your email address.
            </p>

          </div>

          {/* Right Side */}

          <div className="p-7 sm:p-10">

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

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">

                <KeyRound
                  size={30}
                  className="text-orange-500"
                />

              </div>

              <h2 className="mt-5 text-3xl font-bold text-gray-900">
                Verify OTP
              </h2>

              <p className="mt-2 text-gray-500">
                Enter the OTP sent to
              </p>

              <p className="mt-1 font-semibold text-orange-500">
                {email}
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Enter OTP
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength="6"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-xl tracking-[0.5em] outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />

              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3.5 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </motion.button>

            </form>

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
                to="/forgot-password"
                className="text-sm font-semibold text-orange-500 hover:text-orange-600"
              >
                ← Change Email
              </Link>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default ForgotPasswordVerify;