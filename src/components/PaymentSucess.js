import { CheckCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md">
        <div className="text-center p-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-700">Payment Successful!</h2>
          <p className="text-green-600 mt-2">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
          <p className="mt-4 text-gray-500 italic">
            "Good health and good sense are two of life's greatest blessings."
          </p>
        </div>
        <div className="px-6 py-4">
          <Link to="/">
            <a className="flex items-center justify-center w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700">
              <Home className="mr-2 h-5 w-5" />
              Go to Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
