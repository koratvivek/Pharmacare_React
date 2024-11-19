'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserDashboard({ token }) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        avatar: '/placeholder.svg',
        phone: '',
        address: ''
    });

    const [purchases, setPurchases] = useState({
        medicines: [],
        appointments: [],
        packages: []
    });

    const [activeTab, setActiveTab] = useState('medicines');

    useEffect(() => {
        // Fetch user profile data
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('https://pharmacare-django.onrender.com/api/profile/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                const { username, email, phone, address } = response.data;
                setUser({
                    name: username,
                    email,
                    avatar: '/placeholder.svg', // Update if your backend provides an avatar
                    phone,
                    address
                });
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        // Fetch user purchases
        const fetchPurchases = async () => {
            try {
                const response = await axios.get('https://pharmacare-django.onrender.com/api/purchases/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                // Filter purchases based on their types
                const medicines = response.data.filter(purchase => purchase.purchase_type === 'Medicine');
                const appointments = response.data.filter(purchase => purchase.purchase_type === 'appointment');
                const packages = response.data.filter(purchase => purchase.purchase_type === 'package');

                setPurchases({
                    medicines,
                    appointments,
                    packages,
                });
            } catch (error) {
                console.error('Error fetching purchases:', error);
            }
        };

        fetchUserDetails();
        fetchPurchases();
    }, [token]);

    return (
        <div className="container mx-auto p-4 space-y-6 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">User Dashboard</h2>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                    <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-full" />
                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-600">{user.phone}</p>
                        <p className="text-sm text-gray-600">{user.address}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Purchase History</h3>
                    <p className="text-sm text-gray-600">View your medicine, appointment, and healthcare package history</p>
                </div>
                <div>
                    <div className="flex space-x-4 mb-4">
                        <button
                            className={`flex-1 p-2 text-center ${activeTab === 'medicines' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('medicines')}
                        >
                            Medicines
                        </button>
                        <button
                            className={`flex-1 p-2 text-center ${activeTab === 'appointments' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('appointments')}
                        >
                            Appointments
                        </button>
                        <button
                            className={`flex-1 p-2 text-center ${activeTab === 'packages' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('packages')}
                        >
                            Healthcare Packages
                        </button>
                    </div>

                    {activeTab === 'medicines' && purchases.medicines.length > 0 && (
                        <table className="min-w-full border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2">Medicine Name</th>
                                    <th className="border px-4 py-2">Purchase Date</th>
                                    <th className="border px-4 py-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.medicines.map((medicine) => (
                                    <tr key={medicine.id}>
                                        <td className="border px-4 py-2">{medicine.product_name}</td>
                                        <td className="border px-4 py-2">{new Date(medicine.purchase_date).toLocaleDateString()}</td>
                                        <td className="border px-4 py-2">₹{medicine.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {activeTab === 'appointments' && purchases.appointments.length > 0 && (
                        <table className="min-w-full border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2">Appointment</th>
                                    <th className="border px-4 py-2">Purchase Date</th>
                                    <th className="border px-4 py-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.appointments.map((appointment) => (
                                    <tr key={appointment.id}>
                                        <td className="border px-4 py-2">{appointment.product_name}</td>
                                        <td className="border px-4 py-2">{new Date(appointment.purchase_date).toLocaleDateString()}</td>
                                        <td className="border px-4 py-2">₹{appointment.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {activeTab === 'packages' && purchases.packages.length > 0 && (
                        <table className="min-w-full border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2">Package Name</th>
                                    <th className="border px-4 py-2">Purchase Date</th>
                                    <th className="border px-4 py-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.packages.map((pack) => (
                                    <tr key={pack.id}>
                                        <td className="border px-4 py-2">{pack.product_name}</td>
                                        <td className="border px-4 py-2">{new Date(pack.purchase_date).toLocaleDateString()}</td>
                                        <td className="border px-4 py-2">₹{pack.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
