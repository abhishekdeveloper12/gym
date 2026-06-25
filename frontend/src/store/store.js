import create from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  login: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user, error: null });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export const useCartStore = create((set, get) => ({
  items: [],
  coupon: null,

  addItem: (product, quantity = 1) => {
    const items = get().items;
    const existing = items.find(item => item.product._id === product._id);

    if (existing) {
      set({
        items: items.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({ items: [...items, { product, quantity }] });
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter(item => item.product._id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    set({
      items: get().items.map(item =>
        item.product._id === productId ? { ...item, quantity } : item
      ),
    });
  },

  clear: () => set({ items: [], coupon: null }),

  setCoupon: (coupon) => set({ coupon }),

  applyCoupon: (code) => {
    // Mock coupon validation
    const coupons = {
      'TITAN10': { discount: 10, type: 'percentage' },
      'TITAN20': { discount: 20, type: 'percentage' },
      'FLAT500': { discount: 500, type: 'fixed' },
      'WELCOME15': { discount: 15, type: 'percentage' },
    };

    const coupon = coupons[code.toUpperCase()];
    if (coupon) {
      set({ coupon: { ...coupon, code: code.toUpperCase() } });
      return { success: true, message: 'Coupon applied successfully!' };
    }
    return { success: false, message: 'Invalid coupon code' };
  },

  removeCoupon: () => set({ coupon: null }),
}));

export const useProductStore = create((set) => ({
  products: [],
  selectedProduct: null,
  loading: false,

  setProducts: (products) => set({ products }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setLoading: (loading) => set({ loading }),
}));

export const useWishlistStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('wishlist')) || [],

  addItem: (product) => {
    const items = get().items;
    if (!items.find(item => item._id === product._id)) {
      const newItems = [...items, product];
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      set({ items: newItems });
    }
  },

  removeItem: (productId) => {
    const newItems = get().items.filter(item => item._id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(newItems));
    set({ items: newItems });
  },

  isInWishlist: (productId) => {
    return get().items.some(item => item._id === productId);
  },

  clear: () => {
    localStorage.removeItem('wishlist');
    set({ items: [] });
  },
}));
