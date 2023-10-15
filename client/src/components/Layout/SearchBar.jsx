import axios from "axios";
import { useSearch } from "../../context/UseSearch";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const SearchBar = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.get(`${apiUrl}/api/v1/product/search-product/${search.keyword}`);
      if (result?.data.success) {
        setSearch({ ...search, result: result.data.searchProducts });
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="d-flex m-2 p-2" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search Special"
          aria-label="Search"
          value={search.keyword}
          onChange={(e) => {
            setSearch({ ...search, keyword: e.target.value });
          }}
        />
      </form>
    </>
  );
};

export default SearchBar;
