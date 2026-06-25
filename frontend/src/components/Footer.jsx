import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-titan-dark border-t border-titan-gold/20 py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-subheading mb-4 text-titan-gold">Titan Nutrition</h3>
            <p className="text-gray-400">Premium fitness supplements for champions who refuse to settle.</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-titan-gold transition-colors duration-200">
                <FiFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-titan-gold transition-colors duration-200">
                <FiInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-titan-gold transition-colors duration-200">
                <FiTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-titan-gold transition-colors duration-200">
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-subheading mb-4 text-titan-gold">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-titan-gold transition-colors duration-200">
                Products
              </a>
              <a href="#" className="block text-gray-400 hover:text-titan-gold transition-colors duration-200">
                About Us
              </a>
              <a href="#" className="block text-gray-400 hover:text-titan-gold transition-colors duration-200">
                Contact
              </a>
              <a href="#" className="block text-gray-400 hover:text-titan-gold transition-colors duration-200">
                Blog
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-subheading mb-4 text-titan-gold">Support</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-titan-gold transition-colors duration-200">
                FAQ
              </a>
              <a href="#" className="block text-gray-400 hover:text-titan-gold transition-colors duration-200">
                Shipping Info
              </a>
              <a href="#" className="block text-gray-400 hover:text-titan-gold transition-colors duration-200">
                Returns
              </a>
              <a href="#" className="block text-gray-400 hover:text-titan-gold transition-colors duration-200">
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-subheading mb-4 text-titan-gold">Newsletter</h4>
            <p className="text-gray-400 mb-4">Get exclusive deals and fitness tips</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-titan-black border border-titan-gold/20 rounded px-3 py-2 text-white placeholder-gray-500"
              />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-titan-gold/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2024 Titan Nutrition. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-titan-gold transition-colors duration-200 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-titan-gold transition-colors duration-200 text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
