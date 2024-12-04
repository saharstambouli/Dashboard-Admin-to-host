// useRevenueData.js (custom hook to fetch revenue data)
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRevenueData = (selectedMonth, selectedYear) => {
  const [revenueData, setRevenueData] = useState({ totalRevenue: 0, monthlyRevenueData: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      setLoading(true); // Set loading state to true before fetching
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/dashboard/monthlyrevenues/${selectedMonth}/${selectedYear}`
        );
        if (response.data) {
          setRevenueData(response.data); // Set the data if response is valid
        } else {
          setRevenueData({ totalRevenue: 0, monthlyRevenueData: [] }); // Set default values if no data is found
        }
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        setRevenueData({ totalRevenue: 0, monthlyRevenueData: [] }); // Set default values in case of error
      } finally {
        setLoading(false); // Set loading state to false when the data fetching is done
      }
    };

    fetchRevenueData(); // Fetch data when the component mounts or when month/year changes
  }, [selectedMonth, selectedYear]); // Dependency array - will refetch when selectedMonth or selectedYear changes

  return { revenueData, loading }; // Return fetched data and loading state
};
