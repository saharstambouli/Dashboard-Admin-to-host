import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductRents.css'; 

const RentProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/getproducts`);
      console.log("all products:", response);
      
      // Filter products where category is 'rent'
      const rentProducts = response.data.filter(product => product.category === 'rent');
      console.log("filtered products:", rentProducts);
      
      setProducts(rentProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="rent-product-container">
      <h1 className="dashboard-title">Admin Dashboard - Products for Rent</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products available for rent.</p>
        )}
      </div>
    </div>
  );
};

export default RentProduct;

