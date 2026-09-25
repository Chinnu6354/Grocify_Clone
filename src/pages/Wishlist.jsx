import { useEffect, useState, useContext } from "react";
import {
  getWishlist,
  removeFromWishlist,
  addToCart,
} from "../services/api";
import CartContext from "../context/CartContext";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const { loadCartCount } = useContext(CartContext);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const response = await getWishlist();
      setWishlist(response.data);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);

      setWishlist((prev) =>
        prev.filter(
          (item) => item.product.id !== productId
        )
      );
    } catch (error) {
      console.error(
        "Failed to remove wishlist item:",
        error
      );
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);

      await loadCartCount();

      alert("Product added to cart!");
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to add product to cart"
      );
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>

          <p className="text-gray-500">
            Loading your wishlist...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-orange-50 px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-12 text-center">

          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <Heart
                size={32}
                className="fill-orange-500 text-orange-500"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-3 text-gray-500">
            Save your favorite products and shop them anytime.
          </p>

          {wishlist.length > 0 && (
            <div className="mt-4 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-medium text-orange-600 shadow-sm">
              <Heart
                size={16}
                className="mr-2 fill-orange-500"
              />

              {wishlist.length}{" "}
              {wishlist.length === 1
                ? "Product"
                : "Products"}{" "}
              Saved
            </div>
          )}

        </div>


        {/* ================= EMPTY WISHLIST ================= */}

        {wishlist.length === 0 ? (

          <div className="mx-auto max-w-xl rounded-3xl bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-50">

              <Heart
                size={48}
                className="text-orange-300"
              />

            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              You haven't added anything to your wishlist yet.
              Start exploring our products and save your favorites.
            </p>

          </div>

        ) : (

          /* ================= PRODUCTS ================= */

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {wishlist.map((item) => {

              const product = item.product;

              return (

                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* REMOVE BUTTON */}

                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(product.id)
                    }
                    title="Remove from wishlist"
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition-all duration-200 hover:scale-110 hover:bg-red-50"
                  >
                    <Heart
                      size={21}
                      className="fill-red-500"
                    />
                  </button>


                  {/* IMAGE */}

                  <div className="flex h-64 items-center justify-center overflow-hidden bg-white p-6">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />

                  </div>


                  {/* DETAILS */}

                  <div className="p-5">

                    {/* CATEGORY */}

                    <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                      {product.category}
                    </p>


                    {/* NAME */}

                    <h3 className="mt-2 line-clamp-1 text-lg font-bold text-gray-900">
                      {product.name}
                    </h3>


                    {/* DESCRIPTION */}

                    <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
                      {product.description}
                    </p>


                    {/* PRICE */}

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price}
                      </span>

                    </div>


                    {/* ADD TO CART */}

                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(product.id)
                      }
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-orange-600 hover:shadow-lg active:scale-95"
                    >

                      <ShoppingCart size={19} />

                      Add to Cart

                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>

    </section>
  );
}

export default Wishlist;