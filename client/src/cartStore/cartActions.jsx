import { ADD_TO_CART, CLEAR_CART_ITEM, REMOVE_ITEM_CART } from "./cartConstant";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import axios from 'axios';
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  // console.log(id);
  let result = await axios.get(`${apiUrl}/api/v1/product/product/${id}`);
  // console.log(result.data.product.name);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: result.data.product._id,
      name:result. data.product.name,
      price: result.data.product.price,
      imgLink:result. data.product.imgLink,
      color:result. data.product.color,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => async (dispatch, getState) => {
  dispatch({
    type: CLEAR_CART_ITEM,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
