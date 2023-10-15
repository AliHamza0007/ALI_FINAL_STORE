import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { PriceFilter } from "./PriceFilter";
import { useNavigate } from "react-router-dom";
import { Radio, Checkbox } from "antd";
import useCategory from "../Hooks/useCategory";
import AddToCart from "./cart/AddToCart";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const categories = useCategory();
  const [checked, setChecked] = useState([]);
  const [color, setColor] = useState("");
  const [radio, setRadio] = useState([]);

  //count total product
  const [count, setCount] = useState(0);
  //perpage product6s
  const [page, setPage] = useState(1);
  //modal hide show
  //
  //for loading some pages
  const [loading, setLoading] = useState(false);

  const totalCount = async () => {
    var result = await axios.get(`${apiUrl}/api/v1/product/count-product`);
    if (result?.data.success) {
      // toast.success(result.message);
      setCount(result?.data.count);
    }
  };
  useEffect(() => {
    totalCount();
  }, []);
  const getProducts = async () => {
    setLoading(true);
    let result = await axios.get(
      `${apiUrl}/api/v1/product/page-product/${page}`
    );

    if (result?.data.success) {
      // toast.success(result.message);
      setProducts(result.data.products);
      setLoading(false);
    }
  };

  const LoadMore = async () => {
    setLoading(true);
    let result = await axios.get(
      `${apiUrl}/api/v1/product/page-product/${page}`
    );
    if (result?.data.success) {
      setProducts([...products, ...result.data.products]);
      setLoading(false);
    }
  };

  const getChecked = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const FilterProduct = async () => {
    let result = await axios.post(`${apiUrl}/api/v1/product/filter-product`, {
      checked,
      radio,
      color,
    });
    if (result?.data.success) {
      setProducts(result?.data.products);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getProducts();
    // eslint-disable-next-line
  }, [!checked.length, !radio.length]);

  useEffect(() => {
    if (checked.length || radio.length || color) FilterProduct();

    if (page === 1) return;
    LoadMore();

    //eslint-disable-next-line
  }, [checked, radio, page, color]);

  return (
    <Layout
      title={"ALI_FINAL_STORE All Products"}
      keywords={"Watch ,Best phones, laptop,Free"}
      description={"Every type quality products are available at any time "}
    >
      <div className=" text-center py-1 align-items-center">
        <button
          style={{ position: "fixed", top: "55px", left: "20px" }}
          className="btn btn-primary px-3 filter"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          Filter
        </button>
      </div>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="container-fluid bg-light">
          <div className="row justify-content-center align-items-center g-2">
            <div
              className="p-1 col border-end shadow p-3   rounded   "
              style={{ height: "100vh" }}
            >
              <div className="offcanvas-header rounded  p-2">
                <h1 className=" text-center ">Filter Product</h1>
                <button
                  type="button"
                  className="btn-close m-1 ml-auto"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
                <hr />
              </div>
              <div className="list-group offcanvas-body">
                <div className="row">
                  <div className="col-6">
                    <h4 className="border-bottom p-2"> Color</h4>{" "}
                    <div className=" from-group my-1">
                      <select
                        className="form-select from-control cursor-pointer"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      >
                        <option>none</option>
                        <option value="black">black</option>
                        <option value="white">white</option>
                        <option value="blue">blue</option>
                        <option value="gray">gray</option>
                        <option value="green">green</option>
                        <option value="red">red</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <h4 className="border-bottom p-2"> Price</h4>
                    <Radio.Group
                      onChange={(e) => {
                        setRadio(e.target.value);
                      }}
                    >
                      {PriceFilter?.map((p,) => (
                        <Radio key={p.id} className="d-block" value={p.value}>
                          {p.name}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h4 className="border-bottom p-2"> Category</h4>
                    {categories?.map((c) => (
                      <Checkbox
                        key={c._id}
                        onChange={(e) => getChecked(e.target.checked, c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="btn  m-3 px-2 btn-danger"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid pb-5">
        <div className="row my-3 ">
          <div className="  col text-center align-items-center ">
            <h3 className="text-success">All Products</h3>{" "}
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="d-inline-flex flex-wrap  m-1 p-3 "
                >
                  <div className="card ">
                    <img
                      src={
                        product.imgLink
                          ? product.imgLink
                          : `${apiUrl}/api/v1/product/photo-product/${product._id}`
                      }
                      className="card-img-top img-fluid img-responsive"
                      alt={product.name}
                    />
                    <div className="card-body">
                      
<div className="row hover py-2">
<div className="col-6"> <h6 className="card-title text-center ">
                        {product.name}
                      </h6></div>
<div className="col-6"> <p className="card-text text-success h5 ">
                        ${product.price}
                      </p></div>

</div>
                     

                      <p className="card-text ">
                        {product.description.substring(0, 20)}
                      </p>
                      <button
                        onClick={() =>
                          navigate(`/product-details/${product._id}`)
                        }
                        className="btn btn-primary ms-1"
                      >
                        Details
                      </button>
                      <AddToCart id={product._id} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="d-flex flex-column justify-content-center  align-items-center"
                style={{ height: "60vh" }}
              >
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col text-center ms-3 mt-3">
              {products && products.length < count && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();

                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "LoadMore"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
