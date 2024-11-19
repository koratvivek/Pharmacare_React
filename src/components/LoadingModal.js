import React, { useEffect, useState } from 'react';

export default function LoadingModal({ isOpen }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isOpen) {
            // Simulate progress over time
            const interval = setInterval(() => {
                setProgress((prevProgress) =>
                    prevProgress < 100 ? prevProgress + 10 : 100
                );
            }, 500); // Increase by 10% every 500ms (0.5s)

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Processing Payment...</h2>
                <p className="text-sm text-gray-600 mb-4">We are securely processing your payment. Please don't close or refresh the page.</p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${progress}%`, transition: 'width 0.5s' }}
                    ></div>
                </div>

                {/* Status Text */}
                <p className="text-sm text-gray-500">
                    {progress < 100
                        ? `Processing... ${progress}%`
                        : 'Payment completed! Redirecting...'}
                </p>

                {/* Reassurance */}
                <div className="text-sm text-gray-500 mt-4">
                    <p className="mb-2">Your payment is secure and encrypted. <span className="text-green-600 font-bold">Pharmacare</span> ensures safe transactions.</p>
                </div>

                {/* Tip */}
                <p className="mt-4 text-xs text-gray-400">Tip: Track your order history in your profile after the payment is completed.</p>
            </div>
        </div>
    );
}
