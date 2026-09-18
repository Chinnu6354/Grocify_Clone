import { useState } from "react";
import { motion } from "framer-motion";
import { Search,Heart,ShoppingCart,Menu,X,Sun,Moon} from "lucide-react";

  function Navbar({ isDarkMode, setIsDarkMode}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const handleSearch = () => {
    console.log(searchText);
  };

  return (
        <nav
          className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
            isDarkMode
              ? "border-gray-700 bg-gray-900 text-white"
              : "border-orange-100 bg-white text-gray-900"
          }`}>      
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <motion.a
            href="#home"
            className="cursor-pointer text-2xl font-bold text-orange-500 transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            Grocify Website
          </motion.a>

          <motion.div
            className="hidden items-center gap-8 md:flex"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
                <a href="#home" className="transition-colors hover:text-orange-500">Home</a>
                <a href="#about" className="transition-colors hover:text-orange-500">About Us</a>
                <a href="#process" className="transition-colors hover:text-orange-500">Process</a>
                <a href="#contact" className="transition-colors hover:text-orange-500">Contact Us</a>
        </motion.div>
        <div className="flex items-center gap-4">
              <div
                className={`hidden items-center rounded-full border px-3 py-2 transition-all focus-within:border-orange-500 sm:flex ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-gray-50"
                }`}>           <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={`w-32 bg-transparent text-sm outline-none ${
                isDarkMode
                  ? "text-white placeholder:text-gray-400"
                  : "text-gray-900 placeholder:text-gray-500"
              }`}/>
              <button type="button" onClick={handleSearch}>
                <Search size={20} />
              </button>
            </div>
                <button
                type="button"
                className="transition-all duration-200 hover:scale-110 hover:text-orange-500">
                <Heart size={22} />
              </button>

              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="transition-all duration-200 hover:scale-110 hover:text-orange-500">
                {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
              </button>
              <button
                type="button"
                className="transition-all duration-200 hover:scale-110 hover:text-orange-500">
                <ShoppingCart size={22} />
              </button>

                <button
                  type="button"
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
              </div>
            </div>
              {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
        className={`border-t px-4 py-4 shadow-md md:hidden ${
          isDarkMode
            ? "border-gray-700 bg-gray-900"
            : "border-orange-100 bg-white"
        }`}  >     

        <div
          className={`mb-4 flex items-center rounded-full border px-3 py-2 ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-gray-50"
          }`} >
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={`w-full bg-transparent text-sm outline-none ${
              isDarkMode
                ? "text-white placeholder:text-gray-400"
                : "text-gray-900 placeholder:text-gray-500"
            }`} />
          <button type="button" onClick={handleSearch}>
            <Search size={20} />
          </button>
       </div>

       <div className="flex flex-col gap-4">
              <a
                href="#home"
                onClick={() => setIsMenuOpen(false)}
                className="transition-colors hover:text-orange-500">
                Home
              </a>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="transition-colors hover:text-orange-500" >
                About Us
              </a>
              <a
                href="#process"
                onClick={() => setIsMenuOpen(false)}
                className="transition-colors hover:text-orange-500">
                Process
              </a>

              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="transition-colors hover:text-orange-500">
                Contact Us
              </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;