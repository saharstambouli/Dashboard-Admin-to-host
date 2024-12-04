import React, { useState, useEffect } from 'react';
import './Updates.css';
import axios from 'axios';

const Updates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Fetch data from your data source (API, database, etc.)
    const fetchUpdates = async () => {
      try {
        // Assuming 'fetchReviewsAndDate' is an API call or a database query
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/getreviews`);
        
        // Check the response structure
        console.log("response reviews", response.data.reviews);

        // Set the reviews data correctly
        setUpdates(response.data.reviews); // Assuming response.data.reviews is an array
      } catch (error) {
        console.error('Error fetching updates:', error);
      }
    };

    fetchUpdates();
  }, []);

  if (updates.length === 0) {
    return <div>Loading...</div>; // Display loading message while waiting for data
  }

  return (
    <div className='Updates'>
      {updates.map((update) => (
        <div key={update._id} className='update'>
          {/* <img src={update.img} alt='img1' /> */}
          <div className='note'>
            <div className="userNemerating" style={{ marginBottom: '1rem', }}>
              <span>{update.userName}</span>
              <span>{update.rating} étoiles </span>
            </div>
          </div>
          <div>
            {/* <span>{update.time}</span> */}
            <span>{update.reviewText}</span> {/* Add review or additional details */}
            {/* <span>{update.date}</span> Add the date of addition */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Updates;
