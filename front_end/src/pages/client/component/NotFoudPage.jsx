import React from "react";

class NotFound extends React.Component {
  render() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-800">404</h1>
          <p className="mt-2 text-lg text-gray-600">Page Not Found</p>
          <p className="mt-4 text-sm text-gray-500">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    );
  }
}

export default NotFound;
