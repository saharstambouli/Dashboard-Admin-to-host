import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

// Function to apply styles based on the status of the purchase
const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "transparent", // Remove the blue background
      color: "black", // Keep text black for default status
    };
  }
};

// Function to format the date to display only year and month
const formatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, "0")}`;
};

export default function BasicTable() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch purchases from the API when the component mounts
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(
         `${process.env.REACT_APP_API_ENDPOINT}/dashboard/getallpurchases`// Adjust this endpoint based on your backend
        );
        setPurchases(response.data.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  // If data is still loading, show a loading message
  if (loading) {
    return <p>Loading purchases...</p>;
  }

  return (
    <div className="Table">
      <h3>Recent Orders</h3>
      <TableContainer
        component={Paper}
        style={{
          boxShadow: "0px 13px 20px 0px #80808029",
          maxHeight: "400px", // Set a maximum height for the container
          overflowY: "auto", // Enable vertical scrolling
          backgroundColor: "white", // Set the table container background to white
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="left">Tracking ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Additional Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow
                key={purchase._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={makeStyle(purchase.status)} // Apply dynamic styling based on purchase status
              >
                <TableCell component="th" scope="row">
                  {/* Map product names if there are multiple products in the purchase */}
                  {purchase.products.map((product) => product.name).join(", ")}
                </TableCell>
                <TableCell align="left">{purchase._id}</TableCell>
                <TableCell align="left">{formatDate(purchase.purchaseDate)}</TableCell> {/* Format the date */}
                <TableCell align="left" className="Details">
                  {purchase.total_price}$
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
