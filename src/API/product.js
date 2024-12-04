import axios from 'axios';

export async function updateProduct  (productId, updatedFields) {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/updateproduct`, {
            id: productId,
            ...updatedFields,
        }, {
            headers: {
                'Content-Type': 'application/json',
                // Add your authorization token if needed
                // 'Authorization': 'Bearer yourTokenHere',
            }
        });

        console.log('Product updated successfully', response.data);
    } catch (error) {
        console.error('Error updating product', error.response ? error.response.data : error.message);
    }
};


export async function deleteProduct (productId) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/deleteproduct`, {
            headers: {
                'Content-Type': 'application/json',
                // Add your authorization token if needed
                // 'Authorization': 'Bearer yourTokenHere',
            },
            data: { id: productId }, // Send product id in the body
        });

        console.log('Product deleted successfully', response.data);
    } catch (error) {
        console.error('Error deleting product', error.response ? error.response.data : error.message);
    }
};






export async function getProducts()
{   
    try {
        const response=await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/getproducts`);
       console.log('response',response)
       
        if (response.status==200)
            return response.data
    } catch (error) {
        console.log(error)
        return false;
        
    }
}

export async function getProductBycategory(category)
{   
    try {
        const response=await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/getproducts/${category}`);
        if (response.status==200)
            return response.data
    } catch (error) {
        console.log(error)
        return false;
        
    }
}

export async function getProductByID(id) {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/getproduct/${id}`);
        if (response.status == 200)
            return response.data
    } catch (error) {
        console.log(error)
        return false;

    }
}