import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex flex-col items-center justify-center bg-gray-900 text-white text-center py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-orange-600">BlogSphere</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Your ultimate destination for insightful blogs and engaging content.
          </p>
          <Link to='/signup' className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-500 transition duration-300">
            Get Started
          </Link>
        </div>
      </section>

      <section id="features" className="py-8 md:py-16 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <i className="fa-solid fa-pencil-alt text-4xl text-orange-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Write and Publish</h3>
              <p className="text-gray-700">Easily create and publish your own blogs with our intuitive editor.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <i className="fa-solid fa-search text-4xl text-orange-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Discover Content</h3>
              <p className="text-gray-700">Browse and discover a variety of interesting and engaging articles.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-8 md:py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg md:text-xl mb-6">
            BlogSphere is dedicated to providing high-quality, engaging content for readers of all interests. Our platform allows writers to share their thoughts and insights with a global audience.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
