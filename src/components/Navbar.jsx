import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

function Navbar({
  isDarkMode,
  setIsDarkMode,
  onProductsClick,
}) {
  const navigate = useNavigate();

  const { cartCount } = useContext(CartContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState(null);

  // Load logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Search
const handleSearch = () => {
  const query = searchText.trim();

  if (!query) {
    navigate("/#products-section");
    setIsMenuOpen(false);
    return;
  }

  navigate(
    `/?search=${encodeURIComponent(query)}#products-section`
  );

  setIsMenuOpen(false);
};

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsMenuOpen(false);

    navigate("/login");
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        isDarkMode
          ? "border-gray-700 bg-gray-900 text-white"
          : "border-orange-100 bg-white text-gray-900"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <motion.a
          href="#home"
          className="cursor-pointer text-2xl font-bold text-orange-500 transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
    src="/logo.png"
    alt="Grocify"
    className="w-28 sm:w-32 md:w-36 h-auto"
  />
        </motion.a>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden items-center gap-7 md:flex"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="#home"
            className="transition-colors hover:text-orange-500"
          >
            Home
          </a>

          <a
            href="#about"
            className="transition-colors hover:text-orange-500"
          >
            About Us
          </a>

          <a
            href="#process"
            className="transition-colors hover:text-orange-500"
          >
            Process
          </a>

          <button
            type="button"
            onClick={onProductsClick}
            className="transition-colors hover:text-orange-500"
          >
            Products
          </button>

          <a
            href="#contact"
            className="transition-colors hover:text-orange-500"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div
            className={`hidden items-center rounded-full border px-3 py-2 transition-all focus-within:border-orange-500 lg:flex ${
              isDarkMode
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <input
              type="text"
              placeholder="Search"
              value={searchText}
             onChange={(e) => {
  const value = e.target.value;

  setSearchText(value);

  if (!value.trim()) {
    navigate("/#products-section");
  }
}}
              onKeyDown={(e) =>{
                if(e.key === "Enter"){
                  handleSearch();
                }
              }}
              className={`w-28 bg-transparent text-sm outline-none ${
                isDarkMode
                  ? "text-white placeholder:text-gray-400"
                  : "text-gray-900 placeholder:text-gray-500"
              }`}
            />

            <button
              type="button"
              onClick={handleSearch}
            >
              <Search size={20} />
            </button>
          </div>

          {/* Wishlist */}
          <button
  type="button"
  onClick={() => navigate("/wishlist")}
  className="hidden transition-all duration-200 hover:scale-110 hover:text-orange-500 sm:block"
>
  <Heart size={22} />
</button>

          {/* Dark Mode */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="transition-all duration-200 hover:scale-110 hover:text-orange-500"
          >
            {isDarkMode ? (
              <Sun size={22} />
            ) : (
              <Moon size={22} />
            )}
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="relative transition-all duration-200 hover:scale-110 hover:text-orange-500"
          >
            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Logged-in User */}
          {user ? (
            <>
              {/* My Orders */}
              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="hidden text-sm font-semibold transition-colors hover:text-orange-500 sm:block"
              >
                My Orders
              </button>

              {/* Admin */}
{user.role === "ADMIN" && (
  <button
    type="button"
    onClick={() => navigate("/admin")}
    className="hidden text-sm font-semibold transition-colors hover:text-orange-500 sm:block"
  >
    Admin
  </button>
)}

              {/* User Name */}
              <span className="hidden items-center gap-2 text-sm font-semibold text-gray-700 sm:flex">
                👤 {user.name}
              </span>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="hidden rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg sm:block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <a
                href="/login"
                className="hidden rounded-full border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white sm:block"
              >
                Login
              </a>

              {/* Signup */}
              <a
                href="/signup"
                className="hidden rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg sm:block"
              >
                Signup
              </a>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`border-t px-4 py-4 shadow-md md:hidden ${
            isDarkMode
              ? "border-gray-700 bg-gray-900"
              : "border-orange-100 bg-white"
          }`}
        >

          {/* Mobile Search */}
          <div
            className={`mb-4 flex items-center rounded-full border px-3 py-2 ${
              isDarkMode
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`w-full bg-transparent text-sm outline-none ${
                isDarkMode
                  ? "text-white placeholder:text-gray-400"
                  : "text-gray-900 placeholder:text-gray-500"
              }`}
            />

            <button
              type="button"
              onClick={handleSearch}
            >
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col gap-4">

            <a
              href="#home"
              onClick={() => setIsMenuOpen(false)}
              className="transition-colors hover:text-orange-500"
            >
              Home
            </a>

            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="transition-colors hover:text-orange-500"
            >
              About Us
            </a>

            <a
              href="#process"
              onClick={() => setIsMenuOpen(false)}
              className="transition-colors hover:text-orange-500"
            >
              Process
            </a>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onProductsClick();
              }}
              className="text-left transition-colors hover:text-orange-500"
            >
              Products
            </button>

            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="transition-colors hover:text-orange-500"
            >
              Contact Us
            </a>

            {/* Mobile Logged-in User */}
            {user ? (
              <>
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <span>👤</span>
                  <span>{user.name}</span>
                </div>

                {/* My Orders */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/orders");
                  }}
                  className="rounded-full border border-orange-500 px-4 py-2 text-center font-semibold text-orange-500 transition-all hover:bg-orange-500 hover:text-white"
                >
                  My Orders
                </button>

                {/* Admin */}
{user.role === "ADMIN" && (
  <button
    type="button"
    onClick={() => {
      setIsMenuOpen(false);
      navigate("/admin");
    }}
    className="rounded-full border border-orange-500 px-4 py-2 text-center font-semibold text-orange-500 transition-all hover:bg-orange-500 hover:text-white"
  >
    Admin
  </button>
)}

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-orange-500 px-4 py-2 text-center font-semibold text-white transition-all hover:bg-orange-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <a
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full border border-orange-500 px-4 py-2 text-center font-semibold text-orange-500 transition-all hover:bg-orange-500 hover:text-white"
                >
                  Login
                </a>

                {/* Signup */}
                <a
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full bg-orange-500 px-4 py-2 text-center font-semibold text-white transition-all hover:bg-orange-600"
                >
                  Signup
                </a>
              </>
            )}

          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;