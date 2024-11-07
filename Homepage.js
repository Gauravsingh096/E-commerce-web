import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setFeaturedProducts(data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <h1>Welcome to Our Exclusive Store</h1>
        <p>Discover unique products curated just for you.</p>
        <Link to="/products">
          <button className="btn btn-primary"><h4>Explore All </h4></button>
        </Link>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <Link to={`/products/${product._id}`}>
                <button className="btn btn-secondary">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial">
          <p>"Absolutely love the quality of the products!"</p>
          <p>- Alex J.</p>
        </div>
        <div className="testimonial">
          <p>"The best shopping experience I've ever had!"</p>
          <p>- Priya K.</p>
        </div>
        <div className="testimonial">
          <p>"Fast delivery and amazing customer support."</p>
          <p>- John M.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

