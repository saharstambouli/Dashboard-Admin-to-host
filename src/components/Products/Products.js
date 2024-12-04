import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  CircularProgress,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit, Delete, Update, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { updateProduct, deleteProduct } from '../../API/product';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    subcategory: '',
    style: '',
    quantity: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

/////////////////////FETCH PRODUCTS ///////////////////////

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productResponse, categoryResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/getproducts`),
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/countProducts`),
      ]);
      setProducts(productResponse.data);
      setCategoryCounts(categoryResponse.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Convert input fields to lowercase
  const toLowerCaseProduct = (productData) => {
    return {
      ...productData,
      name: productData.name.toLowerCase(),
      category: productData.category.toLowerCase(),
      subcategory: productData.subcategory ? productData.subcategory.toLowerCase() : '',
      style: productData.style ? productData.style.toLowerCase() : '',
    };
  };

  ////////////////////////////EDIT PRODUCTS ////////////////////////
  const handleUpdateProduct = async () => {
    try {
      const updatedFields = toLowerCaseProduct(newProduct);

      const response = await updateProduct(editProductId, updatedFields);

      if (response.status === 200) {
        alert('Product updated successfully!');
        handleCloseEditDialog();
        fetchData(); // Refetch after editing
      }
     
    } catch (err) {
      setError('Failed to update product');
    }
  };

  //////////////////////////DELETE PRODUCT /////////////////

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await deleteProduct(productId);

      if (response.status === 200) {
        alert('Product deleted successfully!');
        fetchData(); // Refetch after deleting
      }
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleOpenAddDialog = () => {
    setOpenDialog(true);
    setNewProduct({
      name: '',
      price: '',
      category: '',
      subcategory: '',
      style: '',
      quantity: '',
    });
    setSelectedFile(null);
  };

  const handleCloseAddDialog = () => {
    setOpenDialog(false);
    setNewProduct({
      name: '',
      price: '',
      category: '',
      subcategory: '',
      style: '',
      quantity: '',
    });
    setSelectedFile(null);
  };

  const handleOpenEditDialog = (product) => {
    setOpenEditDialog(true);
    setEditProductId(product._id);
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory || '',
      style: product.style || '',
      quantity: product.quantity || '',
    });
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setNewProduct({
      name: '',
      price: '',
      category: '',
      subcategory: '',
      style: '',
      quantity: '',
    });
    setSelectedFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  ////////////////////ADD PRODUCT ///////////////////////

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      const productData = toLowerCaseProduct(newProduct); // Convert product data to lowercase

      Object.keys(productData).forEach((key) => {
        if (productData[key]) {
          formData.append(key, productData[key]);
        }
      });

      if (selectedFile) {
        formData.append('image', selectedFile); // Image needs to be appended separately
      }

      // Log FormData for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await axios.post('http://localhost:5000/product/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Product added successfully!');
        handleCloseAddDialog();
        fetchData(); // Refetch after adding
      }
    } catch (err) {
      console.error('Failed to add product:', err);
      setError('Failed to add product');
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <div className="ProductsContainer">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Product Dashboard
        </Typography>

        {/* Category Count Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {categoryCounts.map((count) => (
            <Grid item xs={12} sm={6} md={4} key={count.category}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {count.category.charAt(0).toUpperCase() +
                      count.category.slice(1)}{' '}
                    Products
                  </Typography>
                  <Typography variant="h4">{count.total}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Update All Products and Add Product Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                   <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            onClick={handleOpenAddDialog}
          >
            Add Product
          </Button>
        </Box>

        {/* Product Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Subcategory</TableCell>
                  <TableCell>Style</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={product._id}>
                    <TableCell>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: 50, height: 50, objectFit: 'cover' }}
                        />
                      ) : (
                        'No image'
                      )}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.subcategory || '-'}</TableCell>
                    <TableCell>{product.style || '-'}</TableCell>
                    <TableCell>{product.quantity || '-'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenEditDialog(product)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProduct(product._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Add Product Dialog */}
        <Dialog open={openDialog} onClose={handleCloseAddDialog}>
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
              >
                <MenuItem value="rent">rent</MenuItem>
                <MenuItem value="sale">sale</MenuItem>

              </Select>
            </FormControl>


            <FormControl fullWidth margin="normal">
            <InputLabel>Subcategory</InputLabel>
            <Select
              name="subcategory"
              value={newProduct.subcategory}
              onChange={handleInputChange}
            >
              <MenuItem value="mariage">mariage</MenuItem>
              <MenuItem value="oriental">oriental</MenuItem>
              <MenuItem value="cocktail">cocktail</MenuItem>

            </Select>
            </FormControl>
            <TextField
              label="Style"
              name="style"
              value={newProduct.style}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Cancel</Button>
            <Button onClick={handleAddProduct}>Add</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
              >
                <MenuItem value="cocktail">Cocktail</MenuItem>
                <MenuItem value="marriage">Marriage</MenuItem>
                <MenuItem value="oriental">Oriental</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Subcategory"
              name="subcategory"
              value={newProduct.subcategory}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Style"
              name="style"
              value={newProduct.style}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button onClick={handleUpdateProduct}>Update</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Products;
