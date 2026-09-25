import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, addToCart, updateCartQuantity, getWishlist, addToWishlist, removeFromWishlist } from "../services/api";
import CartContext from "../context/CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [cartQuantities, setCartQuantities] = useState({});
  const [wishlist, setWishlist] = useState([]);

  const [searchParams] = useSearchParams();

const searchQuery = searchParams.get("search") || "";

  const { loadCartCount } = useContext(CartContext);

  

  const handleAddToCart = async (productId) => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login first");
      return;
    }

    await addToCart(productId, 1);

    setCartQuantities((prev) => ({
      ...prev,
      [productId]: 1,
    }));

    await loadCartCount();

  }catch (error) {
  console.error("ADD TO CART ERROR:", error);
  console.error("Response:", error.response);
  console.error("Response data:", error.response?.data);
  console.error("Status:", error.response?.status);

  alert(
    error.response?.data?.message ||
    error.response?.data ||
    "Failed to add product to cart"
  );
}
};


const increaseQuantity = async (productId) => {
  try {
    await addToCart(productId, 1);

    setCartQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));

    await loadCartCount();

  } catch (error) {
    console.error("Failed to increase quantity:", error);
  }
};

const decreaseQuantity = async (productId) => {
  try {
    const currentQuantity = cartQuantities[productId] || 0;
    const newQuantity = currentQuantity - 1;

    await updateCartQuantity(productId, newQuantity);

    setCartQuantities((prev) => {
      const updated = { ...prev };

      if (newQuantity <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = newQuantity;
      }

      return updated;
    });

    await loadCartCount();

  } catch (error) {
    console.error("Failed to decrease quantity:", error);
  }
};

const loadWishlist = async () => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setWishlist([]);
      return;
    }

    const response = await getWishlist();

    const wishlistProductIds = response.data.map(
      (item) => item.product.id
    );

    setWishlist(wishlistProductIds);

  } catch (error) {
    console.error("Failed to load wishlist:", error);
  }
};


const handleWishlist = async (productId) => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login first");
      return;
    }

    // Product already in wishlist → REMOVE
    if (wishlist.includes(productId)) {
      await removeFromWishlist(productId);

      setWishlist((prev) =>
        prev.filter((id) => id !== productId)
      );

      return;
    }

    // Product not in wishlist → ADD
    await addToWishlist(productId);

    setWishlist((prev) => [
      ...prev,
      productId
    ]);

  } catch (error) {
    console.error("Wishlist error:", error);

    console.error("Response:", error.response?.data);
    console.error("Status:", error.response?.status);

    alert(
      error.response?.data?.message ||
      "Failed to update wishlist"
    );
  }
};


  useEffect(() => {
    loadProducts();
    loadWishlist();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();

      console.log("Products from backend:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

 const filteredProducts = products.filter((product) => {
  const productCategory = product.category
    ?.trim()
    .toLowerCase();

  const selected = selectedCategory
    .trim()
    .toLowerCase();

  // Category filter
  let categoryMatch = true;

  if (selectedCategory !== "All") {
    // Handle Vegetable / Vegetables
    if (
      selected === "vegetables" &&
      (productCategory === "vegetable" ||
        productCategory === "vegetables")
    ) {
      categoryMatch = true;
    } else {
      categoryMatch = productCategory === selected;
    }
  }

  // Search filter
  const searchMatch =
    !searchQuery ||
    product.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    product.category
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    product.description
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

  return categoryMatch && searchMatch;
});

  if (loading) {
    return (
      <section className="py-16 text-center">
        <p>Loading products...</p>
      </section>
    );
  }

  return (
    <section id="products-section"
    className="px-6 py-16">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            All Products
          </h2>

          <p className="mt-2 text-gray-500">
            Fresh products delivered to your doorstep
          </p>
        </div>

        {/* Categories */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">

          <button
            onClick={() => setSelectedCategory("All")}
            className={`rounded-full px-5 py-2 font-medium transition ${
              selectedCategory === "All"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setSelectedCategory("Fruits")}
            className={`rounded-full px-5 py-2 font-medium transition ${
              selectedCategory === "Fruits"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100"
            }`}
          >
            Fruits
          </button>

          <button
            onClick={() => setSelectedCategory("Vegetables")}
            className={`rounded-full px-5 py-2 font-medium transition ${
              selectedCategory === "Vegetables"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100"
            }`}
          >
            Vegetables
          </button>

          <button
            onClick={() => setSelectedCategory("Dairy & Eggs")}
            className={`rounded-full px-5 py-2 font-medium transition ${
              selectedCategory === "Dairy & Eggs"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100"
            }`}
          >
            Dairy & Eggs
          </button>

          <button
            onClick={() => setSelectedCategory("Field Crop Seeds")}
            className={`rounded-full px-5 py-2 font-medium transition ${
              selectedCategory === "Field Crop Seeds"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100"
            }`}
          >
            Field Crop Seeds
          </button>

          <button
            onClick={() => setSelectedCategory("Vegetable Seeds")}
            className={`rounded-full px-5 py-2 font-medium transition ${
              selectedCategory === "Vegetable Seeds"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100"
            }`}
          >
            Vegetable Seeds
          </button>

          <button
            onClick={() => setSelectedCategory("Plants")}
            className={`rounded-full px-5 py-2 font-medium transition ${
              selectedCategory === "Plants"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100"
            }`}
          >
            Plants
          </button>

        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products available in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
<div className="h-64 w-full overflow-hidden bg-white">
  <img
    src={product.image}
    alt={product.name}
    className="h-full w-full object-contain"
  />
</div>

                <div className="p-5">

                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-xl font-bold">
                      ₹{product.price}
                    </span>

                   <div className="flex items-center gap-2">

  {/* Wishlist */}
  <button
    type="button"
    onClick={() => handleWishlist(product.id)}
    className={`flex h-11 w-11 items-center justify-center rounded-lg border transition ${
      wishlist.includes(product.id)
        ? "border-red-500 bg-red-50 text-red-500"
        : "border-gray-300 bg-white text-gray-600 hover:border-red-400 hover:text-red-500"
    }`}
  >
    <span className="text-2xl">
      {wishlist.includes(product.id) ? "♥" : "♡"}
    </span>
  </button>

  {/* Cart */}
  {!cartQuantities[product.id] ? (
    <button
      type="button"
      onClick={() => handleAddToCart(product.id)}
      className="rounded-lg bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
    >
      Add to Cart
    </button>
  ) : (
    <div className="flex h-11 overflow-hidden rounded-lg bg-red-600 text-white">

      {/* Minus */}
      <button
        type="button"
        onClick={() => decreaseQuantity(product.id)}
        className="w-12 text-2xl font-bold hover:bg-red-700"
      >
        −
      </button>

      {/* Quantity */}
      <div className="flex w-14 items-center justify-center bg-white text-lg font-semibold text-red-600">
        {cartQuantities[product.id]}
      </div>

      {/* Plus */}
      <button
        type="button"
        onClick={() => increaseQuantity(product.id)}
        className="w-12 text-2xl font-bold hover:bg-red-700"
      >
        +
      </button>

    </div>
  )}

</div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Products;