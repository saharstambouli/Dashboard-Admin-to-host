// import React from 'react'
// import Chart from 'react-apexcharts';
// import './CustomerReview.css';
// const CustomerReview = () => {
//   const data = {
//     series: [
//       {
//         name: "Review",
//         data: [10, 50, 30, 90, 40, 120, 100],
//       },
//     ],
//     options: {
//       chart: {
//         type: "area",
//         height: "auto",
//       },

//       fill: {
//         colors: ["#fff"],
//         type: "gradient",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "smooth",
//         colors: ["#ff929f"],
//       },
//       tooltip: {
//         x: {
//           format: "dd/MM/yy HH:mm",
//         },
//       },
//       grid: {
//         show: false,
//       },
//       xaxis: {
//         type: "datetime",
//         categories: [
//           "2018-09-19T00:00:00.000Z",
//           "2018-09-19T01:30:00.000Z",
//           "2018-09-19T02:30:00.000Z",
//           "2018-09-19T03:30:00.000Z",
//           "2018-09-19T04:30:00.000Z",
//           "2018-09-19T05:30:00.000Z",
//           "2018-09-19T06:30:00.000Z",
//         ],
//       },
//       yaxis: {
//         show: false
//       },
//       toolbar:{
//         show: false
//       }
//     },
//   };
//   return <div className="CustomerReview">
//         <Chart options={data.options} series={data.series} type="area" />
//   </div>;
// };

// export default CustomerReview




import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "./CustomerReview.css";

const CustomerReview = () => {
  const [reviewData, setReviewData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/getreviews`); // Replace with your actual API endpoint
        const reviews = response.data.reviews;

        // Extract the data for the chart
        const ratings = reviews.map((review) => review.rating);
        const dates = reviews.map((review) =>
          new Date(review.reviewDate).toISOString()
        );

        setReviewData(ratings);
        setCategories(dates);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    };

    fetchReviews();
  }, []);

  const data = {
    series: [
      {
        name: "Review",
        data: reviewData,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "datetime",
        categories: categories,
      },
      yaxis: {
        show: false,
      },
      toolbar: {
        show: false,
      },
    },
  };

  return (
    <div className="CustomerReview">
      <Chart options={data.options} series={data.series} type="area" />
    </div>
  );
};

export default CustomerReview;
