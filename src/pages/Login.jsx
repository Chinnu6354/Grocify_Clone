import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ShoppingBasket } from "lucide-react";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      console.log("Logged in user:", JSON.stringify(response.data, null, 2));

      const token = response.data.token;

      localStorage.setItem("token", token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Invalid email or password"
      );
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

          {/* Left Side */}
          <div className="hidden bg-gradient-to-br from-orange-500 to-orange-600 p-10 text-white md:flex md:flex-col md:justify-center">

            <ShoppingBasket size={55} />

            <h1 className="mt-6 text-4xl font-bold">
              Welcome Back!
            </h1>

            <p className="mt-4 text-lg leading-8 text-orange-50">
              Fresh fruits, vegetables and quality products
              are waiting for you.
            </p>

            <p className="mt-6 text-sm text-orange-100">
              Login to continue shopping with Grocify.
            </p>

          </div>

          {/* Right Side */}
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

            <div className="text-center">

              <h2 className="text-3xl font-bold text-gray-900">
                Welcome Back 👋
              </h2>

              <p className="mt-2 text-gray-500">
                Login to continue shopping
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
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />

                </div>
              </div>

              {/* Password */}
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-12 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-orange-500"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>
              </div>


              <div className="mt-2 flex justify-end">
  <Link
    to="/forgot-password"
    className="text-sm font-semibold text-orange-500 transition hover:text-orange-600"
  >
    Forgot Password?
  </Link>
</div>

              {/* Login Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3.5 font-semibold text-white shadow-lg transition hover:shadow-xl"
              >
                Login
              </motion.button>

            </form>

            {/* Message */}
            {message && (
              <p
                className={`mt-4 text-center text-sm font-medium ${
                  message.includes("successful")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            {/* Signup */}
            <p className="mt-7 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-orange-500 transition hover:text-orange-600"
              >
                Sign Up
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

export default Login;