// components/UserInitializer.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../API/user";
import { setUser, setIsAuth } from "../../Reducers/UserReducer";
import {getProducts} from '../../API/product'
import { setProducts } from "../../Reducers/productSlice";


export default function Initializer() {
    const dispatch = useDispatch();

    const getUserr = async () => {
        try {
            const response = await getUser();
            console.log("User Data (with populated cart):", response); 
    
            if (response) {
                dispatch(setUser({
                    email: response.email,
                    UserName: response.UserName,
                }));
                dispatch(setIsAuth(true));
    
               
    
             
            } else {
                localStorage.removeItem("token");
                dispatch(setIsAuth(false));
            }
        } catch (error) {
            console.error("Error in getUserr:", error);
        }
    };

    const fetchProducts=async()=> {     
        try {
            const res=await getProducts()
            console.log('fetch products',res)
            if (res)
                 dispatch(setProducts(res));
        } catch (error) {
            console.log(error);
        }
     }

    useEffect(() => {
        getUserr();
        fetchProducts();
       
    }, []);

    return null; 
}


