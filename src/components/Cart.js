import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import LoadingModal from './LoadingModal';

const stripePromise = loadStripe('pk_test_51Q27uLSCmOJFa9ssaPk3olhoVC62aiKqCFm4hlqeMV51Oo30p9P8R5Qzftl0Q2HsPsMGmf2ISod28txwV3u5PFcB00htJkKGza');

const CartPage = ({ token }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('https://pharmacare-django.onrender.com/api/cart/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setItems(response.data.items);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, [token]);

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            await axios.patch(`https://pharmacare-django.onrender.com/api/cart/update/`, {
                item_id: itemId,
                quantity: newQuantity
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setItems(items.map(item => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete(`https://pharmacare-django.onrender.com/api/cart/remove/${itemId}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setItems(items.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const calculateSubtotal = () => {
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://pharmacare-django.onrender.com/api/checkout/', {
                purchase_type: 'Medicine',  // Pass the purchase type (medicine, appointment, package)
                items
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            const { sessionId } = response.data;
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error during checkout:', error);
        }
        finally {
            setIsLoading(false);
        }
    };


    const subtotal = calculateSubtotal();
    const shipping = 5.00;
    const total = subtotal + shipping;

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto px-6 py-10 min-h-screen">
            <LoadingModal isOpen={isLoading} />
            <h1 className="text-4xl font-bold mb-8">Your Shopping Cart</h1>

            <div className="bg-white shadow-lg rounded-lg p-8">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="py-4 text-left text-lg">Product</th>
                            <th className="py-4 text-left text-lg">Price</th>
                            <th className="py-4 text-left text-lg">Quantity</th>
                            <th className="py-4 text-left text-lg">Total</th>
                            <th className="py-4 text-left text-lg">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-lg">Your cart is empty.</td>
                            </tr>
                        ) : (
                            items.map(item => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 text-lg">{item.product.name}</td>
                                    <td className="py-4 text-lg">₹{item.product.price}</td>
                                    <td className="py-4">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            className="w-20 border rounded p-2 text-lg"
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td className="py-4 text-lg">₹{(item.product.price * item.quantity).toFixed(2)}</td>
                                    <td className="py-4">
                                        <button
                                            className="text-red-500 text-lg"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="mt-6 flex justify-between text-lg font-bold">
                    <div>Subtotal:</div>
                    <div>₹{subtotal.toFixed(2)}</div>
                </div>
                <div className="mt-4 flex justify-between text-lg font-bold">
                    <div>Shipping:</div>
                    <div>₹{shipping.toFixed(2)}</div>
                </div>
                <div className="mt-4 flex justify-between text-2xl font-bold">
                    <div>Total:</div>
                    <div>₹{total.toFixed(2)}</div>
                </div>
                <div className="mt-8 flex justify-between">
                    <a href="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Continue Shopping</a>
                    <button
                        onClick={handleCheckout}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
