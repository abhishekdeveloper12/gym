import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiShare2 } from 'react-icons/fi';
import { productAPI } from '../api/api';
import { useCartStore } from '../store/store';
import { useWishlistStore } from '../store/store';
import ImageGallery from '../components/ImageGallery';
import ProductCard from '../components/ProductCard';
import StickyProductCTA from '../components/StickyProductCTA';
import toast from 'react-hot-toast';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data.product);
      setReviews(response.data.reviews);

      // Fetch related products
      const relatedResponse = await productAPI.getAll({ limit: 4, category: response.data.product.category });
      setRelatedProducts(relatedResponse.data.products.filter(p => p._id !== id));
    } catch (error) {
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-hero flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-gradient-hero flex items-center justify-center">Product not found</div>;
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-hero py-12 pb-32">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <ImageGallery images={product.images} />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-display mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-titan-gold">★</span>
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                </div>
                {discount > 0 && (
                  <span className="bg-titan-orange/20 text-titan-orange px-3 py-1 rounded-full text-sm font-semibold">
                    {discount}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-titan-gold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>
            </div>

            <p className="text-gray-300">{product.description}</p>

            {/* Benefits */}
            <div>
              <h3 className="text-subheading mb-3 text-titan-gold">Key Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {product.benefits?.map((benefit, idx) => (
                  <span key={idx} className="bg-titan-gold/10 text-titan-gold px-3 py-1 rounded-full text-sm">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutritional Info */}
            <div className="card p-4">
              <h3 className="text-subheading mb-3 text-titan-gold">Per Serving</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-gray-400">Protein:</span> <span className="font-bold">{product.nutritionalInfo?.protein}</span></div>
                <div><span className="text-gray-400">Calories:</span> <span className="font-bold">{product.nutritionalInfo?.calories}</span></div>
                <div><span className="text-gray-400">Carbs:</span> <span className="font-bold">{product.nutritionalInfo?.carbs}</span></div>
                <div><span className="text-gray-400">Fat:</span> <span className="font-bold">{product.nutritionalInfo?.fat}</span></div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-titan-gold/30 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-titan-gold/10"
                >
                  -
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-titan-gold/10"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1"
              >
                <FiShoppingCart /> Add to Cart
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`btn-secondary ${isInWishlist(product._id) ? 'bg-titan-orange text-white border-titan-orange' : ''}`}
              >
                <FiHeart />
              </button>

              <button className="btn-secondary">
                <FiShare2 />
              </button>
            </div>

            {/* Usage Instructions */}
            <div className="card p-4">
              <h3 className="text-subheading mb-2 text-titan-gold">How to Use</h3>
              <p className="text-gray-300">{product.usageInstructions}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="card p-6">
          <h2 className="text-heading mb-6 text-titan-gold">Customer Reviews</h2>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review._id} className="border-b border-titan-gold/10 pb-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.user?.avatar || 'https://i.pravatar.cc/150'}
                      alt={review.user?.name || 'User'}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{review.user?.name || 'User'}</p>
                          <p className="text-sm text-yellow-400">{'★'.repeat(review.rating)}</p>
                        </div>
                        <span className="text-sm text-gray-400">{review.verified && '✓ Verified Purchase'}</span>
                      </div>
                      <p className="text-gray-300 mt-2">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-heading mb-8 text-titan-gold">Related Products</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      {product && (
        <StickyProductCTA
          product={product}
          price={product.price}
          originalPrice={product.originalPrice}
          onAddToCart={() => handleAddToCart()}
          onWishlistToggle={handleWishlistToggle}
          isInWishlist={isInWishlist(product._id)}
        />
      )}
    </div>
  );
}

export default ProductDetailPage;
