import { motion } from "framer-motion";
import basketImage from "../assets/basket.png";

function Hero({isDarkMode, onShopNow}) {
  return (
          <section
                id="home"
                className={`min-h-[calc(100vh-80px)] transition-colors duration-300 ${
                  isDarkMode
                ? "bg-gray-900"
                : "bg-gradient-to-br from-orange-50 via-white to-orange-100"
                }`}>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-10 sm:px-8 sm:py-14 md:grid-cols-2 md:gap-8 md:px-10 md:py-16 lg:gap-12 lg:px-12 lg:py-20">
            <motion.div
                className="flex flex-col items-center text-center md:items-start md:text-left"  initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}>

             <motion.div
                  className="mb-5 inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}>
                                   Export Best Quality...
              </motion.div>

                <motion.h1
                    className={`max-w-xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl ${
                      isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}>
                               Tasty Organic Fruits & Veggies In Your City
                </motion.h1>

                <motion.p
                  className={`mt-6 max-w-lg text-base leading-7 sm:text-lg ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                  
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}>
                      Fresh and healthy fruits and vegetables delivered
                      directly to your doorstep.
                </motion.p>
               <motion.button
  type="button"
  onClick={() => {
    console.log("SHOP NOW CLICKED");
    onShopNow();
  }}
  className="mt-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 font-semibold text-white"
>
  Shop Now
</motion.button>
            </motion.div>
            
              <motion.div
                      className=" relative flex justify-center"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}>
                <div className="absolute h-72 w-72 rounded-full bg-orange-200/40 blur-2xl sm:h-80 sm:w-80"></div>   
                  <img
                      src={basketImage}
                      alt="Basket of fresh fruits and vegetables"
                    className="float-animation w-full max-w-sm object-contain transition-transform duration-300 hover:scale-105 sm:max-w-md md:max-w-lg"/>
              </motion.div>

         </div>
    </section>
  );
}

export default Hero;