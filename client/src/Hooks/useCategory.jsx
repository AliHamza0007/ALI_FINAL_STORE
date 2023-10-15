import axios from "axios";
import React, { useEffect } from "react";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useCategory = () => {
  const [categories, setCategories] = React.useState([]);
  async function getCategory() {
    let result = await axios.get(
      `${apiUrl}/api/v1/category/get-category`);
    if (result?.data.success) {
      setCategories(result?.data.getCategory);
    }
  }
  useEffect(() => {
    getCategory();
  }, []);
  return categories;
};

export default useCategory;
