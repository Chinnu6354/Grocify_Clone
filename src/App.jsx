import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Truck, ShieldCheck, ArrowUp } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

        useEffect(() => {
          const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
          };
          window.addEventListener("scroll", handleScroll);

          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
        }, []);

        const scrollToTop = () => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        };

  return (
          <motion.div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}/>
      <Hero isDarkMode={isDarkMode} />
      

        <section
          id="about"
          className={`px-6 py-20 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-orange-50"
          }`}>
         <div className="mx-auto max-w-7xl">

           <div className="text-center">
              <h2 className="text-3xl font-bold text-orange-500 sm:text-4xl">
                   Why Choose Grocify?
              </h2>

                 <p
                      className={`mx-auto mt-4 max-w-2xl ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}>
                      We make grocery shopping simple by bringing fresh,
                      quality products directly to your doorstep.
                 </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <motion.div
                    className={`rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                   <Leaf size={28} />
            </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Fresh & Organic
                </h3>

                <p
                  className={`mt-3 text-sm leading-6 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                  Fresh fruits and vegetables selected for quality
                  and freshness.
                </p>
             </motion.div>

              <motion.div
          className={`rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <Truck size={28} />
          </div>

            <h3 className="mt-5 text-xl font-semibold">
              Fast Delivery
            </h3>

            <p
              className={`mt-3 text-sm leading-6 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
              Get your groceries delivered quickly and
              conveniently to your home.
            </p>
         </motion.div>
          <motion.div
        className={`rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <ShieldCheck size={28} />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Quality Guaranteed
              </h3>
              <p
                className={`mt-3 text-sm leading-6 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                We focus on providing reliable and high-quality
                grocery products.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


        <section
          id="process"
          className={`px-6 py-20 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          }`}>
          <div className="mx-auto max-w-7xl">

            <div className="text-center">
              <h2 className="text-3xl font-bold text-orange-500 sm:text-4xl">
                How It Works
              </h2>

              <p
                className={`mx-auto mt-4 max-w-2xl ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                Getting fresh groceries delivered to your home is
                simple and convenient.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white shadow-lg">
                1
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Choose Products
              </h3>

              <p
                className={`mt-3 text-sm leading-6 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                Browse our collection of fresh fruits and
                vegetables and choose your favorites.
              </p>
            </motion.div>

        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white shadow-lg">
                    2
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">
                    Place Your Order
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-6 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                    Add your selected products to the cart and
                    complete your order in just a few clicks.
                  </p>
                </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white shadow-lg">
                  3
                </div>
                <h3 className="mt-5 text-xl font-semibold">
                  Get Your Delivery
                </h3>
                <p
                  className={`mt-3 text-sm leading-6 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`} >
                  Sit back and receive fresh groceries directly
                  at your doorstep.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`px-6 py-20 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-orange-50"
          }`}>
          <div className="mx-auto max-w-7xl">

            <div className="text-center">
              <h2 className="text-3xl font-bold text-orange-500 sm:text-4xl">
                Contact Us
              </h2>

              <p
                className={`mx-auto mt-4 max-w-2xl ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                Have questions or need help? We'd love to hear from you.
              </p>
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
                <h3 className="text-2xl font-semibold">
                  Get In Touch
                </h3>

                <p
                  className={`mt-4 leading-7 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                  Our team is here to help you with your grocery
                  shopping experience.
                </p>

                <div className="mt-8 space-y-5">

                  <div>
                    <p className="font-semibold text-orange-500">
                      Email
                    </p>
                    <p
                      className={
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }>
                      support@grocify.com
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-orange-500">
                      Phone
                    </p>
                    <p
                      className={
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }>
                      +91 63547 97144
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-orange-500">
                      Location
                    </p>
                    <p
                      className={
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }>
                      Bengaluru, India
                    </p>
                  </div>

                </div>
              </motion.div>
            
        <motion.div
          className={`rounded-2xl p-6 shadow-lg ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          }`}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}>
                <div className="space-y-5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                        : "border-gray-200 bg-gray-50 text-gray-900"
                    }`} />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                        : "border-gray-200 bg-gray-50 text-gray-900"
                    }`} />

                  <textarea
                    rows="4"
                    placeholder="Your Message"
                    className={`w-full resize-none rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                        : "border-gray-200 bg-gray-50 text-gray-900"
                    }`}
                  ></textarea>
                  <button
                    type="button"
                    className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    Send Message
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>



      <footer
        className={`border-t px-6 py-6 text-center ${
          isDarkMode
            ? "border-gray-700 bg-gray-900 text-gray-400"
            : "border-orange-100 bg-white text-gray-500"
        }`}
      >
        <p className="text-sm">
          © 2026 Grocify Website. All rights reserved.
        </p>
      </footer>

        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
          >
            <ArrowUp size={22} />
          </button>
        )}
    </motion.div>
  );
}

export default App;