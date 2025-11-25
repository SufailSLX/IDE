import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';

const Auth = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Hide the loader after 5 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Loader text="Loading authentication..." />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Authentication</h2>
        <p className="text-center text-gray-600">Welcome to the Auth Page!</p>
        <div className="space-y-4">
          <button className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign In
          </button>
          <button className="w-full px-4 py-2 font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
