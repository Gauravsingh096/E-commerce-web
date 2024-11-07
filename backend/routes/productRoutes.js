import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

//  to get all products 
router.get('/', async (req, res) => {
  const { minPrice = 0, maxPrice = Infinity } = req.query;

  try {
    const products = await Product.find({
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

//by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details' });
  }
});

export default router;
