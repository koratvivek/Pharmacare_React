import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home, Search } from 'lucide-react';  

export default function NotFound() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-center p-6">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <FileQuestion className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-700">404 - Page Not Found</h1>
          <p className="text-green-600 mt-2">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>
        <div className="text-center p-6">
          <p className="text-green-700 mb-4">
            It seems you've ventured into uncharted territory. Don't worry, we'll help you find your way back.
          </p>
          <div className="flex flex-col space-y-2">
            <Link to="/" className="w-full">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center">
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
