import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";

function ProductCarousel({ token }) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://pharmacare-django.onrender.com/api/products/",
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        )
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products!", error);
            });
    }, [token]);

    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="arrow next-arrow" onClick={onClick}>
                <GrNext />
            </div>
        );
    };

    const SamplePrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="arrow prev-arrow" onClick={onClick}>
                <GrPrevious />
            </div>
        );
    };

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="product-carousel">
            {products.length > 0 ? (
                <Slider {...settings}>
                    {products.map((product) => (
                        <div key={product.ItemID} className="p-4">
                            <div className="product-card" onClick={() => handleProductClick(product.ItemID)}>
                                <img
                                    className="p-image"
                                    src={product.image}
                                    alt={product.name}
                                />
                                <h3 className="p-name mt-4 text-lg">{product.name}</h3>
                                <p className="p-price font-bold text-lg mt-2">₹{product.price}</p>
                                <button className="add-to-cart-btn1 mt-2">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
}

export default ProductCarousel;
