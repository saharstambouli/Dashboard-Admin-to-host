import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Refresh } from '@mui/icons-material';
import './Orders.css';

const Orders = () => {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayMode, setDisplayMode] = useState('table');
  const [metric, setMetric] = useState('totalOrders');

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/getpurchases`);
        setPurchases(response.data.purchases);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching purchases');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  // Aggregation for chart data and totals
  const aggregatedData = purchases.reduce(
    (acc, purchase) => {
      const monthYear = new Date(purchase.purchaseDate).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
      });

      if (!acc.data[monthYear]) {
        acc.data[monthYear] = { monthYear, totalOrders: 0, totalPrice: 0 };
      }

      acc.data[monthYear].totalOrders += 1;
      acc.data[monthYear].totalPrice += purchase.total_price;
      acc.totalOrders += 1;
      acc.totalRevenue += purchase.total_price;

      return acc;
    },
    { data: {}, totalOrders: 0, totalRevenue: 0 }
  );

  const chartData = Object.values(aggregatedData.data);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <CardContent>
          <Typography color="error" variant="h6" align="center">
            Error: {error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box className="orders-container">
      <Card className="orders-card">
        <CardHeader
          title="Monthly Orders Overview"
          subheader="Track detailed purchases each month"
          action={
            <Box display="flex" gap={2}>
              <FormControl variant="outlined" size="small" className="select-box">
                <InputLabel id="display-mode-label">Display Mode</InputLabel>
                <Select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)} label="Display Mode">
                  <MenuItem value="table">Table</MenuItem>
                  <MenuItem value="chart">Chart</MenuItem>
                </Select>
              </FormControl>
              {displayMode === 'chart' && (
                <FormControl variant="outlined" size="small" className="select-box">
                  <InputLabel id="metric-label">Metric</InputLabel>
                  <Select value={metric} onChange={(e) => setMetric(e.target.value)} label="Metric">
                    <MenuItem value="totalOrders">Total Orders</MenuItem>
                    <MenuItem value="totalPrice">Total Price</MenuItem>
                  </Select>
                </FormControl>
              )}
              <IconButton onClick={() => window.location.reload()} className="refresh-btn">
                <Refresh />
              </IconButton>
            </Box>
          }
        />
        <CardContent>
          {displayMode === 'table' ? (
            <TableContainer component={Paper} className="table-container">
              <Table aria-label="purchases table">
                <TableHead>
                  <TableRow>
                    <TableCell>Year-Month</TableCell>
                    <TableCell>Products</TableCell>
                    <TableCell>Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchases.map((purchase, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(purchase.purchaseDate).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit' })}</TableCell>
                      <TableCell>
                        {purchase.products.map((product) => (
                          <Typography key={product._id}>{`${product.name} - $${product.price}`}</Typography>
                        ))}
                      </TableCell>
                      <TableCell>${purchase.total_price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableRow>
                  <TableCell colSpan={2} align="right"><strong>Total Orders:</strong></TableCell>
                  <TableCell><strong>{aggregatedData.totalOrders}</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} align="right"><strong>Total Revenue:</strong></TableCell>
                  <TableCell><strong>${aggregatedData.totalRevenue.toFixed(2)}</strong></TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthYear" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={metric} fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Orders;
