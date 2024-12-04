import React, { useState } from 'react';
import axios from 'axios';
import Calendar from './Calendar';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [rents, setRents] = useState([]);

  const handleCalendarClick = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/getrents/${product._id}`);
      console.log("rents by id:", response);
      // Extract only startDate and endDate
      const rentDates = response.data.map(rent => ({
        startDate: rent.startDate,
        endDate: rent.endDate
      }));
      setRents(rentDates);
      setShowCalendar(true);
    } catch (error) {
      console.error('Error fetching rents:', error);
    }
  };

  const handleAddRent = async (newRent) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/product/addrents/${product._id}`, { rents: [newRent] });
      setRents([...rents, newRent]);
    } catch (error) {
      console.error('Error adding rent:', error);
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">{product.category}</p>
      <button
        onClick={handleCalendarClick}
        className="calendar-button"
      >
        View/Add Rents
      </button>
      {showCalendar && (
        <Calendar rents={rents} onAddRent={handleAddRent} onClose={() => setShowCalendar(false)} />
      )}
    </div>
  );
};

export default ProductCard;
