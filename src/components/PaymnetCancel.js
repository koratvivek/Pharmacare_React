import React from 'react';
import { XCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PaymentCanceled() {
    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg">
                <div className="text-center p-6">
                    {/* Red Circle with Icon */}
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <XCircle className="h-10 w-10 text-red-600" />
                    </div>

                    {/* Payment Canceled Title */}
                    <h2 className="text-2xl font-bold text-red-700">Payment Canceled</h2>

                    {/* Description */}
                    <p className="text-green-700 mt-2">
                        Your payment has been canceled. No charges were made.
                    </p>
                </div>

                {/* Content Section */}
                <div className="text-center px-6">
                    <p className="text-green-600 mb-4">
                        If you encountered any issues or have changed your mind, please feel free to try again later or contact our support team for assistance.
                    </p>
                </div>

                {/* Footer with Return Button */}
                <div className="flex justify-center p-6">
                    <Link to="/">
                        <a className="bg-green-600 text-white flex items-center justify-center px-4 py-2 rounded-md hover:bg-green-700 transition">
                            <Home className="mr-2 h-4 w-4" />
                            Return to Home
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
