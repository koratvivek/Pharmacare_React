import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = (params) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      await axios.post('https://pharmacare-django.onrender.com/api/contact/', formData, {
        headers: {
          Authorization: `Token ${params.token}`,
        },
      });
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">Contact Us</h1>
        {submitSuccess && <p className="text-green-500 text-center">Your message has been sent successfully!</p>}
        {submitError && <p className="text-red-500 text-center">There was an error sending your message. Please try again.</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-green-500 text-white rounded-lg transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
