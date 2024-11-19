import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import "../styles/Product.css";

function Product({ token }) {
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [minPrice, setMinPrice] = useState(""); // Min price filter
  const [maxPrice, setMaxPrice] = useState(""); // Max price filter
  const [sortOrder, setSortOrder] = useState(""); // Sort order
  const navigate = useNavigate();

  // Static categories array with updated names
  const categories = [
    "Health Care",
    "Cough & Cold",
    "Digestion & Nausea",
    "Medicine & Health Sciences",
    "Single Homeopathic Remedies",
    "Chyawanprash",
    "Baby & Child Care",
    "Bathroom Medicine Cabinets",
    "Face Creams",
    "Omega-3",
    "Herbal Supplements",
    "Milk Thistle",
    "Isabgol",
    "Gokshura",
    "Triphala",
    "Calcium-Vitamin D Combination",
    "Mass & Weight Gainers",
    "Prescription Medication",
    "Karela",
    "Arjuna",
    "Punarnava",
    "Shilajit",
    "Ashwagandha",
    "Brahmi",
    "Pill Organisers"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://pharmacare-django.onrender.com/api/products/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        setAllProducts(response.data); // Store all products
        setFilteredProducts(response.data); // Initialize filtered products
        setTotalPages(Math.ceil(response.data.length / 10)); // Update total pages based on number of products
      } catch (error) {
        console.error("Error fetching products!", error);
      }
    };

    fetchProducts();
  }, [token]);

  const filterProducts = () => {
    let filtered = allProducts;

    // Filter by search
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category.name === selectedCategory
      );
    }

    // Filter by min price
    if (minPrice) {
      filtered = filtered.filter(product => product.price >= Number(minPrice));
    }

    // Filter by max price
    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= Number(maxPrice));
    }

    // Sort products
    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        const priceA = Number(a.price);  // Ensure the price is a number
        const priceB = Number(b.price);  // Ensure the price is a number
        if (sortOrder === "desc") {
          return priceA - priceB;  // Ascending order: Low to High
        } else if (sortOrder === "asc") {
          return priceB - priceA;  // Descending order: High to Low
        }
        return 0;
      });
    }

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / 16));
    setPage(0);
  };

  useEffect(() => {
    filterProducts();
  }, [search, selectedCategory, allProducts, minPrice, maxPrice, sortOrder]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected);
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = async (productId) => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);

    try {
      await axios.post(
        'https://pharmacare-django.onrender.com/api/cart/add/',
        {
          product_id: productId,
          quantity: 1
        },
        {
          headers: {
            'Authorization': `Token ${token}`,
          },
        }
      );
      alert('Product added to cart!');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized! Please login again.');
      } else {
        console.error("Error adding product to cart!", error);
        alert('Failed to add product to cart. Please try again.');
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  const itemsPerPage = 12;
  const paginatedProducts = filteredProducts.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="product">
      <h1 className="t-name text-center text-2xl font-bold mb-6">Our Products</h1>
      <div className="flex flex-col xl:flex-row gap-6 xl:items-center xl:justify-between p-4 bg-green-50 rounded-lg shadow-md mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="flex-grow p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 mb-2 md:mb-0"
        />
        <select
          onChange={handleCategoryChange}
          value={selectedCategory || ''}
          className="ml-0 md:ml-2 p-2 border border-green-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 mb-2 md:mb-0"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="ml-0 md:ml-2 p-2 border border-green-300 rounded-lg mb-2 md:mb-0"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="ml-0 md:ml-2 p-2 border border-green-300 rounded-lg mb-2 md:mb-0"
        />
        <select
          onChange={handleSortChange}
          value={sortOrder || ''}
          className="ml-0 md:ml-2 p-2 border border-green-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
        >
          <option value="">Sort by Price</option>
          <option value="asc">High to Low</option>
          <option value="desc">Low to High</option>
        </select>
      </div>

      <div className="p-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.isArray(paginatedProducts) && paginatedProducts.length > 0 ? paginatedProducts.map(product => (
          <div className="p-card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" key={product.id} onClick={() => handleProductClick(product.ItemID)}>
            <img className="p-image w-full h-40 object-cover rounded-t-lg" src={product.image} alt={product.name} />
            <h3 className="p-name text-center text-lg font-semibold mt-2">{product.name}</h3>
            <div className="p-pricing text-center mt-1">
              <span className="p-price text-xl text-green-600">₹{product.price}</span>
            </div>
            <button
              className="add-to-cart-btn1 w-full bg-green-500 text-white p-2 rounded-lg mt-2 transition duration-300 hover:bg-green-600"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product.id);
              }}
              disabled={isAddingToCart}
            >
              Add
            </button>
          </div>
        )) : <p className="text-center col-span-full">No products available</p>}
      </div>

      {totalPages > 1 && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"text-gray-500 px-4 py-2 cursor-default bg-gray-100 rounded-lg"}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={6}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center space-x-4 p-4"}
          pageLinkClassName={
            "px-4 py-2 border border-green-400 text-green-400 bg-green-50 rounded-lg transition duration-300 ease-in-out hover:bg-green-400 hover:text-white font-medium shadow-md"
          }
          previousLinkClassName={
            "px-4 py-2 border border-green-400 text-green-400 bg-green-50 rounded-lg transition duration-300 ease-in-out hover:bg-green-400 hover:text-white font-medium shadow-md"
          }
          nextLinkClassName={
            "px-4 py-2 border border-green-400 text-green-400 bg-green-50 rounded-lg transition duration-300 ease-in-out hover:bg-green-400 hover:text-white font-medium shadow-md"
          }
          activeLinkClassName={"bg-green-500 text-white cursor-default shadow-lg"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      )}
    </div>
  );
}

export default Product;
