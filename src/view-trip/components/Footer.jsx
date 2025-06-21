import React from 'react'

function Footer({trip}) {
  return (
    <footer className="mt-20 bg-gradient-to-r from-amber-50 to-yellow-50 border-t border-amber-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-700 bg-clip-text text-transparent">
                Safara
              </h3>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Empowering you to explore the world safely with AI-powered trip planning and comprehensive safety features.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white text-sm">t</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white text-sm">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Travel</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-amber-600 cursor-pointer transition-colors">Destinations</li>
              <li className="hover:text-amber-600 cursor-pointer transition-colors">Safety Tips</li>
              <li className="hover:text-amber-600 cursor-pointer transition-colors">Travel Guides</li>
              <li className="hover:text-amber-600 cursor-pointer transition-colors">Emergency Contacts</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-amber-600 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-amber-600 cursor-pointer transition-colors">Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-amber-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Safara. All rights reserved. Designed for your safe travel.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-500 text-sm">Made with</span>
            <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-pulse"></div>
            <span className="text-gray-500 text-sm">for travelers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer