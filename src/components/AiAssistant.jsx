import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";

function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Products under ₹50",
    "Healthy breakfast",
    "Cheap snacks",
  ];

  const askAi = async (customMessage) => {
    const query = customMessage || message;

    if (!query.trim()) return;

    try {
      setLoading(true);
      setResponse("");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/ai`,
        {
          params: { message: query },
        }
      );

      setResponse(res.data);
    } catch (error) {
      console.error(error);
      setResponse("Sorry, I couldn't get a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[9999]">

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="mb-4 w-[350px] max-w-[90vw] overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-orange-400 p-4 text-white">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <Bot size={22} />
                </div>

                <div>
                  <h3 className="flex items-center gap-2 font-bold">
                    Grocify AI
                    <Sparkles size={16} />
                  </h3>

                  <p className="text-xs text-orange-100">
                    Smart grocery assistant
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>

        
            <div className="max-h-[420px] overflow-y-auto p-4">

              {!response && !loading && (
                <>
                  <p className="mb-4 text-sm text-gray-600">
                    Hi 👋 What groceries are you looking for today?
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setMessage(item);
                          askAi(item);
                        }}
                        className="rounded-full border border-orange-200 px-3 py-2 text-xs text-orange-600 transition hover:bg-orange-50"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {loading && (
                <div className="flex items-center gap-2 py-4 text-orange-500">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-orange-500" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:150ms]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:300ms]" />

                  <span className="ml-2 text-sm">
                    Grocify AI is thinking...
                  </span>
                </div>
              )}

              {response && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-orange-50 p-4"
                >
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                      <Bot size={17} />
                    </div>

                    <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
                      {response}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="border-t border-gray-100 p-3">
              <div className="flex items-center gap-2 rounded-2xl bg-gray-50 p-2">

                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      askAi();
                    }
                  }}
                  placeholder="Ask Grocify AI..."
                  className="flex-1 bg-transparent px-2 py-2 text-sm outline-none"
                />

                <button
                  onClick={() => askAi()}
                  disabled={loading}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white transition hover:bg-orange-600 disabled:opacity-50"
                >
                  <Send size={18} />
                </button>

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
  <motion.button
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setOpen(true)}
    className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-4 font-semibold text-white shadow-xl hover:bg-orange-600"
  >
    <Bot size={22} />

    <span className="hidden sm:block">
      Ask Grocify AI
    </span>
  </motion.button>
)}

    </div>
  );
}

export default AiAssistant;