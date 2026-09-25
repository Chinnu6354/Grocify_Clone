import { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

function Contact({ isDarkMode }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      await api.post("/contact", formData);

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error("Failed to send message:", error);

      alert(
        error.response?.data?.message ||
        "Failed to send message"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className={`px-6 py-20 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800" : "bg-orange-50"
      }`}
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADING */}

        <div className="text-center">

          <h2 className="text-3xl font-bold text-orange-500 sm:text-4xl">
            Contact Us
          </h2>

          <p
            className={`mx-auto mt-4 max-w-2xl ${
              isDarkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            Have questions or need help? We'd love to hear from you.
          </p>

        </div>

        {/* CONTENT */}

        <div className="mt-12 grid gap-10 md:grid-cols-2">

          {/* LEFT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            <h3 className="text-2xl font-semibold">
              Get In Touch
            </h3>

            <p
              className={`mt-4 leading-7 ${
                isDarkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
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
                    isDarkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }
                >
                  support@grocify.com
                </p>
              </div>

              <div>
                <p className="font-semibold text-orange-500">
                  Phone
                </p>

                <p
                  className={
                    isDarkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }
                >
                  +91 63547 97144
                </p>
              </div>

              <div>
                <p className="font-semibold text-orange-500">
                  Location
                </p>

                <p
                  className={
                    isDarkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }
                >
                  Bengaluru, India
                </p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT SIDE - CONTACT FORM */}

          <motion.div
            className={`rounded-2xl p-6 shadow-lg ${
              isDarkMode
                ? "bg-gray-900"
                : "bg-white"
            }`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
          >

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                    : "border-gray-200 bg-gray-50 text-gray-900"
                }`}
              />

              {/* EMAIL */}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                    : "border-gray-200 bg-gray-50 text-gray-900"
                }`}
              />

              {/* MESSAGE */}

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Your Message"
                required
                className={`w-full resize-none rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                    : "border-gray-200 bg-gray-50 text-gray-900"
                }`}
              />

              {/* SEND BUTTON */}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending
                  ? "Sending..."
                  : "Send Message"}
              </button>

            </form>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default Contact;