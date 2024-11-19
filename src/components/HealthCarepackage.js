import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pill, Stethoscope, Syringe, Check } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import LoadingModal from './LoadingModal';

const stripePromise = loadStripe('pk_test_51Q27uLSCmOJFa9ssaPk3olhoVC62aiKqCFm4hlqeMV51Oo30p9P8R5Qzftl0Q2HsPsMGmf2ISod28txwV3u5PFcB00htJkKGza');

export default function PharmacyCarePackages({ token }) {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get("https://pharmacare-django.onrender.com/api/packages/", {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                console.log(response.data[0]);
                setPackages(response.data);
            } catch (error) {
                console.error(error);
                setError('Failed to load packages');
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [token]);

    const handleCheckout = async (pkg) => {
        setIsLoading(true); // Show loading modal
        try {
            // Create a checkout session
            const response = await axios.post("https://pharmacare-django.onrender.com/api/checkout/",
                {
                    items: [{ package_id: pkg.id, package_name: pkg.name, price: pkg.price }],
                    purchase_type: 'package'  // Indicate that it's a package purchase
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            const sessionId = response.data.sessionId;

            // Redirect to Stripe Checkout
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) {
                console.error("Stripe Checkout Error:", error);
            }
        } catch (error) {
            console.error("Checkout Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Elements stripe={stripePromise}>

            <LoadingModal isOpen={isLoading} />

            <div className="container mx-auto py-8 min-h-screen">
                <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Pharmacy Care Packages</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="border rounded-lg shadow-lg p-4 flex flex-col">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-green-700">{pkg.name}</h2>
                                {pkg.id === 1 ? <Pill className="h-6 w-6 text-green-500" /> :
                                    pkg.id === 2 ? <Stethoscope className="h-6 w-6 text-green-500" /> :
                                        <Syringe className="h-6 w-6 text-green-500" />}
                            </div>
                            <p className="text-sm text-gray-600">{pkg.description}</p>
                            <p className="text-2xl font-bold text-green-600 mb-4">₹{pkg.price}<span className="text-sm font-normal">/month</span></p>
                            <ul className="space-y-2 mb-4">
                                {pkg.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-2" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="bg-green-500 text-white rounded px-4 py-2"
                                onClick={() => handleCheckout(pkg)} // Handle checkout on click
                            >
                                Subscribe Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Elements>
    );
}
