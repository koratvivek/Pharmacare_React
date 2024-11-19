import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-green-700 to-green-600 text-green-100">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Pharmacare</h2>
                        <p className="text-sm">Nurturing Health, Naturally</p>
                        <div className="flex space-x-4">
                            <button className="hover:text-white hover:bg-green-800 p-2 rounded-full">
                                <FaFacebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </button>
                            <button className="hover:text-white hover:bg-green-800 p-2 rounded-full">
                                <FaXTwitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </button>
                            <button className="hover:text-white hover:bg-green-800 p-2 rounded-full">
                                <FaInstagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </button>
                            <button className="hover:text-white hover:bg-green-800 p-2 rounded-full">
                                <FaLinkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-white">About Us</a></li>
                            <li><a href="/products" className="hover:text-white">Products</a></li>
                            <li><a href="/search_doctors" className="hover:text-white">Find a Doctor</a></li>
                            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                            <li><a href="/shipping" className="hover:text-white">Shipping Information</a></li>
                            <li><a href="/returns" className="hover:text-white">Returns Policy</a></li>
                            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
                        <p className="text-sm mb-4">Stay updated with our latest offers and health tips.</p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 bg-green-600 border border-green-500 placeholder-green-300 text-white rounded-md focus:outline-none"
                            />
                            <button className="w-full px-4 py-2 bg-white text-green-700 hover:bg-green-100 rounded-md">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-green-500 my-8"></div>
                <div className="text-center text-sm">
                    © {currentYear} Pharmacare. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
