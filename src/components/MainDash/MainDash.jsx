import React, { useState, useEffect } from "react";
import "./MainDash.css";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import axios from "axios";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";

const MainDash = () => {
  const [loading, setLoading] = useState(true);
  const [cardsData, setCardsData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Current month
  const [year, setYear] = useState(new Date().getFullYear()); // Current year

  useEffect(() => {
    const fetchCardsData = async () => {
      setLoading(true);
      try {
        const ordersResponse = await axios.get(
         `${process.env.REACT_APP_API_ENDPOINT}/dashboard/Nombredecommandes`
        );
        const revenueResponse = await axios.get(
       `${process.env.REACT_APP_API_ENDPOINT}/dashboard/monthlyrevenues/${month}/${year}`
        );

        const totalOrders = ordersResponse.data.data[0]?.totalOrders || 0;
        

        const monthlyRevenueData = revenueResponse.data.monthlyRevenueData || [];
        console.log("yearly revenue",monthlyRevenueData);
        const totalRevenue = revenueResponse.data.totalRevenue || 0;
        // console.log("total revenue " ,totalRevenue);

        // Prepare revenue trend (series)
        const revenueSeries = monthlyRevenueData.map((item) => item.revenue || 0);

        // Calculate barValue for the current month
        const highestRevenue = Math.max(...revenueSeries, 1); // Avoid division by zero
        const currentMonthRevenue = monthlyRevenueData[month - 1]?.revenue || 0;
        const barValue = Math.round((currentMonthRevenue / highestRevenue) * 100);

        setCardsData([
          {
            title: "Orders",
            color: {
              backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
              boxShadow: "0px 10px 20px 0px #e0c6f5",
            },
            barValue: 70,
            png: UilUsdSquare,
            value: totalOrders,
            series: [],
          },
          {
            title: "Revenue",
            color: {
              backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
              boxShadow: "0px 10px 20px 0px #FDC0C7",
            },
            barValue,
            png: UilMoneyWithdrawal,
            value: monthlyRevenueData[0].revenue, // Display revenue for the selected month
            series: [
              {
                name: "Monthly Revenue",
                data: revenueSeries, // Revenue trend for all months
              },
            ],
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardsData();
  }, [month, year,setCardsData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      {/* <div className="filters">
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </div> */}
      <Cards cardsData={cardsData} />
      <Table />
    </div>
  );
};

export default MainDash;
