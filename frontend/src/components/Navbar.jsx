import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiHeart, FiSearch, FiMessageSquare, FiGrid } from 'react-icons/fi';
import { useCartStore } from '../store/store';
import { useAuthStore } from '../store/store';
import { useWishlistStore } from '../store/store';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCartStore();
  const { user, logout } = useAuthStore();
  const { items: wishlistItems } = useWishlistStore();

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="container-custom flex justify-between items-center py-4 gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-200">
            TITAN
          </span>
          <span className="text-xs font-medium text-titan-gold tracking-widest uppercase hidden sm:block">
            Nutrition
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/products" className="text-white hover:text-titan-gold transition-colors duration-200 whitespace-nowrap text-sm font-medium">
            Products
          </Link>
          <Link to="/" className="text-white hover:text-titan-gold transition-colors duration-200 whitespace-nowrap text-sm font-medium">
            About Us
          </Link>
          <Link to="/" className="text-white hover:text-titan-gold transition-colors duration-200 whitespace-nowrap text-sm font-medium">
            Quality Assurance
          </Link>
          <Link to="/" className="text-white hover:text-titan-gold transition-colors duration-200 whitespace-nowrap text-sm font-medium">
            Blog
          </Link>
          <Link to="/" className="text-white hover:text-titan-gold transition-colors duration-200 whitespace-nowrap text-sm font-medium">
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-5">
          {/* Search Bar */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-900 border border-gray-700 rounded-full px-4 py-2 pl-10 text-white text-sm focus:outline-none focus:border-titan-gold w-48 transition-colors duration-200"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          </div>

          {/* Icons */}
          <Link to="/wishlist" className="relative text-white hover:text-titan-gold transition-colors duration-200 flex-shrink-0">
            <FiHeart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-titan-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative text-white hover:text-titan-gold transition-colors duration-200 flex-shrink-0">
            <FiShoppingCart size={20} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-titan-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </Link>

          {user ? (
            <Link to="/dashboard" className="text-white hover:text-titan-gold transition-colors duration-200 flex-shrink-0">
              <FiUser size={20} />
            </Link>
          ) : (
            <Link to="/login" className="text-white hover:text-titan-gold transition-colors duration-200 flex-shrink-0">
              <FiUser size={20} />
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex-shrink-0 text-white hover:text-titan-gold transition-colors duration-200"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 py-4">
          <div className="container-custom space-y-4">
            <Link to="/products" className="block text-white hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Products
            </Link>
            <Link to="/" className="block text-white hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link to="/" className="block text-white hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Quality Assurance
            </Link>
            <Link to="/" className="block text-white hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link to="/" className="block text-white hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link to="/wishlist" className="block text-white hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Wishlist ({wishlistItems.length})
            </Link>
            <Link to="/cart" className="block text-white hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Cart ({items.length})
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block text-white hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-white hover:text-titan-gold transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-white hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block text-white hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
