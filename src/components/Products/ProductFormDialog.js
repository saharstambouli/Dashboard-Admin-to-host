import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const ProductFormDialog = ({
  open,
  handleClose,
  product,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  isEditing,
}) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        name="name"
        label="Product Name"
        type="text"
        fullWidth
        variant="outlined"
        value={product.name}
        onChange={handleInputChange}
      />
      <TextField
        margin="dense"
        name="price"
        label="Price"
        type="number"
        fullWidth
        variant="outlined"
        value={product.price}
        onChange={handleInputChange}
      />
      <FormControl fullWidth margin="dense">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          name="category"
          value={product.category}
          onChange={handleInputChange}
          label="Category"
        >
          <MenuItem value="sale">Sale</MenuItem>
          <MenuItem value="rent">Rent</MenuItem>
        </Select>
      </FormControl>
      <TextField
        margin="dense"
        name="subcategory"
        label="Subcategory"
        type="text"
        fullWidth
        variant="outlined"
        value={product.subcategory}
        onChange={handleInputChange}
      />
      <TextField
        margin="dense"
        name="style"
        label="Style"
        type="text"
        fullWidth
        variant="outlined"
        value={product.style}
        onChange={handleInputChange}
      />
      <TextField
        margin="dense"
        name="quantity"
        label="Quantity"
        type="number"
        fullWidth
        variant="outlined"
        value={product.quantity}
        onChange={handleInputChange}
      />
      <input accept="image/*" id="image-upload" type="file" onChange={handleFileChange} />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary">
        {isEditing ? 'Update' : 'Add'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ProductFormDialog;
