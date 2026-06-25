import express from 'express';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Category from '../models/Category.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, goal, search, sort, page = 1, limit = 12 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (goal) query.goals = goal;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = {};
    if (sort === 'price-low') sortOption.price = 1;
    if (sort === 'price-high') sortOption.price = -1;
    if (sort === 'rating') sortOption.rating = -1;
    if (sort === 'newest') sortOption.createdAt = -1;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('category');

    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('relatedProducts');

    const reviews = await Review.find({ product: req.params.id })
      .populate('user', 'name avatar');

    res.json({
      product,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bestsellers
router.get('/special/bestsellers', async (req, res) => {
  try {
    const products = await Product.find({ isBestseller: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
