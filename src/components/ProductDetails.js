import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetails.css";

function ProductDetails({ token }) {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const thumbnailContainerRef = useRef(null);

  useEffect(() => {
    axios.get(`https://pharmacare-django.onrender.com/api/product/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    }
    )
      .then(response => {
        setProduct(response.data);
        if (response.data.AllImagesURLs.length > 0) {
          setSelectedImage(response.data.AllImagesURLs[0]);  // Set the first image as selected
        }
      })
      .catch(error => {
        console.error("Error fetching product details!", error);
      });
  }, [id, token]);

  const handleAddToCart = async (productId) => {


    try {
      const response = await axios.post(
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
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  // Handle click on thumbnail
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Scroll the thumbnail container up
  const scrollUp = () => {
    thumbnailContainerRef.current.scrollBy({ top: -150, behavior: "smooth" });
  };

  // Scroll the thumbnail container down
  const scrollDown = () => {
    thumbnailContainerRef.current.scrollBy({ top: 150, behavior: "smooth" });
  };


  const renderItemSpecifications = () => {
    if (Array.isArray(product.ItemSpecifications)) {
      return (
        <ul className="specifications-list">
          {product.ItemSpecifications.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      );
    } else if (typeof product.ItemSpecifications === "object") {
      return (
        <ul className="specifications-list">
          {Object.entries(product.ItemSpecifications).map(([key, value], index) => (
            <li key={index}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      );
    }
    return <p>No specifications available</p>;
  };

  return (
    <section className="min-h-screen">
      <div className="ProductDetails ">
        <div className="gallery-container">
          {/* Up arrow button */}
          <button className="scroll-button up-button" onClick={scrollUp}>
            &#9650;
          </button>

          <div className="thumbnail-container" ref={thumbnailContainerRef}>
            {product.AllImagesURLs.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === image ? "active" : ""}`}
                onClick={() => handleImageClick(image)}
              >
                <img src={image} alt={`Product ${index}`} />
              </div>
            ))}
          </div>

          {/* Down arrow button */}
          <button className="scroll-button down-button" onClick={scrollDown}>
            &#9660;
          </button>
        </div>

        <div className="main-image-container">
          <img
            src={selectedImage}
            alt="Selected Product"
            className="main-image"
          />
        </div>

        <div className="product-details">
          {/* Product Name */}
          <h2 className="product-name">{product.name}</h2>

          {/* Product Pricing */}
          <div className="product-pricing">
            <span className="price">₹{product.price}</span>
          </div>
          {/* Additional Info */}
          <div className="additional-info">
            {renderItemSpecifications()}
          </div>

          {/* Add to Cart Button */}
          <button
            className="add-to-cart-btn1"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product.id);
            }}

          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-details">
        <h1 className="title">Product Details</h1>
        <div className="description">
          <h5 className="subtitle">Description</h5>
          <p className="content">
            {product.description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
