import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '' });

  // Fetch products with filters
  const fetchProducts = async (filterParams) => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products', {
        params: filterParams,
      });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts({});
  }, []);

  const handleFilterApply = () => {
    const filterParams = {
      minPrice: filters.minPrice || 0,
      maxPrice: filters.maxPrice || Infinity,
    };

    fetchProducts(filterParams);
  };

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="filters">
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <button onClick={handleFilterApply}>Apply Filters</button>
      </div>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <Link to={`/products/${product._id}`}>
                <button className="btn">View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No products found for the selected filters.</p>
        )}
      </div>
    </div>
  );
}

export default ProductListingPage;
