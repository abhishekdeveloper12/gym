import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { useCartStore } from '../store/store';
import { useAuthStore } from '../store/store';
import { useWishlistStore } from '../store/store';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCartStore();
  const { user, logout } = useAuthStore();
  const { items: wishlistItems } = useWishlistStore();

  return (
    <nav className="sticky top-0 z-50 bg-titan-dark/80 border-b border-titan-gold/20" style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' }}>
      <div className="container-custom flex justify-between items-center py-4 gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">
            Titan
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-titan-gold transition-colors duration-200 whitespace-nowrap">
            Home
          </Link>
          <Link to="/products" className="text-gray-300 hover:text-titan-gold transition-colors duration-200 whitespace-nowrap">
            Products
          </Link>
          <a href="#faq" className="text-gray-300 hover:text-titan-gold transition-colors duration-200 whitespace-nowrap">
            FAQ
          </a>
          <a href="#community" className="text-gray-300 hover:text-titan-gold transition-colors duration-200 whitespace-nowrap">
            Community
          </a>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/wishlist" className="relative hover:text-titan-gold transition-colors duration-200 flex-shrink-0">
            <FiHeart size={24} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-titan-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative hover:text-titan-gold transition-colors duration-200 flex-shrink-0">
            <FiShoppingCart size={24} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-titan-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-titan-gold transition-colors duration-200 whitespace-nowrap">
                <FiUser className="flex-shrink-0" />
                <span className="truncate">{user.name}</span>
              </Link>
              <button
                onClick={logout}
                className="btn-secondary text-sm flex-shrink-0"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-titan-gold transition-colors duration-200 whitespace-nowrap">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm flex-shrink-0">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex-shrink-0 transition-colors duration-200 hover:text-titan-gold"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-titan-dark border-t border-titan-gold/20 py-4">
          <div className="container-custom space-y-4">
            <Link to="/" className="block text-gray-300 hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="block text-gray-300 hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Products
            </Link>
            <Link to="/wishlist" className="block text-gray-300 hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Wishlist ({wishlistItems.length})
            </Link>
            <Link to="/cart" className="block text-gray-300 hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Cart ({items.length})
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block text-gray-300 hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-gray-300 hover:text-titan-gold transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-300 hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block text-gray-300 hover:text-titan-gold transition-colors duration-200" onClick={() => setIsOpen(false)}>
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
