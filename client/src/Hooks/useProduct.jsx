import axios from "axios";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useProduct = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    let result = await axios.get(
      `${apiUrl}/api/v1/product/get-product`
    );

    if (result?.data.success) {
      setProducts(result.data.getProduct);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return products;
};

export default useProduct;
