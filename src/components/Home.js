import React from 'react';
import ProductCarousel from './ProductCarousel';

const HomePage = ({token}) => {
    return (
        <div className="bg-gray-100">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-24">
                <div className="container mx-auto text-center">
                    <h2 className="text-5xl font-extrabold mb-6">Your Trusted Pharmacy Awaits</h2>
                    <p className="text-xl mb-8">Quality medications and personalized care for you and your family.</p>
                    <a href="#contact" className="bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-400 transition duration-300 shadow-lg">
                        Get in Touch
                    </a>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-white">
                <div className="container mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-12">Our Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {['Prescription Filling', 'Health Consultations', 'Delivery Services', 'Vaccinations', 'Medication Therapy Management', 'Health Screenings'].map((service, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                <h4 className="text-2xl font-semibold mb-2">{service}</h4>
                                <p className="text-gray-700">We offer {service.toLowerCase()} to meet your healthcare needs.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="py-24 bg-gradient-to-r from-green-700 to-green-600 text-white">
                <div className="container mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-8">Featured Products</h3>
                    <ProductCarousel token={token} />
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-24 bg-white">
                <div className="container mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-8">About Us</h3>
                    <p className="max-w-2xl mx-auto text-lg mb-8">
                        Committed to providing our community with the highest level of pharmaceutical care. Our expert pharmacists are always ready to assist you.
                    </p>
                    <a href="#contact" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-500 transition duration-300">Learn More</a>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-24 bg-gradient-to-r from-green-700 to-green-600 text-white relative">
                <div className="container mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-12">What Our Customers Say</h3>
                    <div className="flex text-black flex-col md:flex-row md:justify-center gap-8">
                        {[
                            { name: "John Doe", feedback: "The staff here are so helpful and always answer my questions." },
                            { name: "Jane Smith", feedback: "I love the convenience of their delivery service!" },
                            { name: "Alice Johnson", feedback: "Great pharmacy with friendly and knowledgeable staff." }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 w-full md:w-1/3">
                                <div className="relative">
                                    <div className="absolute inset-0 p-12 bg-gradient-to-r from-green-500 to-green-400 opacity-20 rounded-lg"></div>
                                    <p className="italic relative z-10">"{testimonial.feedback}"</p>
                                    <p className="font-semibold mt-4 relative z-10">- {testimonial.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Health Tips Section */}
            <section id="health-tips" className="py-24 bg-white">
                <div className="container mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-12 text-gray-800">Health Tips</h3>
                    <div className="flex flex-col items-center">
                        <ul className="list-disc list-inside max-w-xl mx-auto text-lg">
                            {[
                                "Stay hydrated by drinking plenty of water.",
                                "Eat a balanced diet rich in fruits and vegetables.",
                                "Get regular exercise to maintain a healthy weight.",
                                "Schedule regular health check-ups.",
                                "Take medications as prescribed by your healthcare provider."
                            ].map((tip, index) => (
                                <li key={index} className="text-left mb-6 flex items-center">
                                    <span className="w-4 h-4 bg-green-600 rounded-full mr-2"></span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-12">
                            <p className="text-lg italic text-gray-600">
                                Remember, your health is your wealth!
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Contact Section */}
            <section id="contact" className="py-24 bg-gradient-to-r from-green-700 to-green-600 text-white">
                <div className="container mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-8">Contact Us</h3>
                    <p className="mb-8">Have any questions? We're here to help!</p>
                    <form className="mt-8 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                        <input type="text" placeholder="Your Name" className="w-full p-2 mb-4 border border-gray-300 rounded" />
                        <input type="email" placeholder="Your Email" className="w-full p-2 mb-4 border border-gray-300 rounded" />
                        <textarea placeholder="Your Message" className="w-full p-2 mb-4 border border-gray-300 rounded" rows="4"></textarea>
                        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-500 transition duration-300">Send Message</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
