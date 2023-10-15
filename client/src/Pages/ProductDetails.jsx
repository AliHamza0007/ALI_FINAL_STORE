import  { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
 
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import AddToCart from "./cart/AddToCart";
import RubberBand from 'react-reveal/RubberBand'
import {Fade,Rotate} from 'react-reveal'
import axios from "axios";
const apiUrl=import.meta.env.VITE_REACT_APP_API_URL;
const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [similarProduct, setSimilarProduct] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  async function getProduct() {
    let result = await axios.get(
      `${apiUrl}/api/v1/product/single-product/${params.slug}`);

    if (result?.data.success) {
      setProduct(result.data.singleProduct);
      relatedPoducts(result?.data.singleProduct._id, result?.data.singleProduct.category);
    }
  }

  const relatedPoducts = async (pid, cid) => {
    let result = await axios.get(
      `${apiUrl}/api/v1/product/related-product/${pid}/${cid}`);
    if (result?.data.success) {
      setSimilarProduct(result?.data.relatedProduct);
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();

    //eslint-disable-next-line
  }, [params?.slug]);
  return (
    <Layout
      title={"Products details"}
      keywords={"Product,Product Details,Comfort Furniture,Free"}
    >
      <div className="container text-center align-items-center justify-content-center mt-4 pb-5">
        {product ? (
          <div className="row">
            <RubberBand>
              <h3 className="text-primary">Details</h3>
            </RubberBand>
            <Rotate>
            <div className=" col-md-5  ">
              <div className="image p-4 ">
                <img
  src={product.imgLink?product.imgLink:`${apiUrl}/api/v1/product/photo-product/${params.slug || product._id}`}                     

                
                  className="img img-fluid    rounded "
                  alt={product.name}
                  // width={"80vh"}
                />
              </div>
            </div>
            </Rotate>
            <Fade bottom>
            <div className="col-md-6  text-start pt-5 px-4">
              <h4>Name : {product.name}</h4>
              <h4>Price:  &pound;{product.price}</h4>
              <h4>Description: {product.description}</h4>
              <h4>color: {product.color}</h4>
              <h4 className="text-warning text-success"> {product.inStock} </h4>
              <AddToCart id={product._id} />
              <button
                className="btn  text-center mx-3 btn-secondary px-3"
                onClick={() => navigate('/products')}
              >
                Go Back
              </button>
            </div>
            </Fade>
          </div>
        ) : (
          <h1 className="text-center m-5 align-items-center justify-content-center">
            Product Not Found
          </h1>
        )}
        <hr />
        <div className="row ">
          <div className=" col ">
            {similarProduct.length > 0 ? (
              <div className="text-center align-items-center ">
                Similar Products
              </div>
            ) : (
              <div className="text-center   align-items-center ">
                No Similar Product Found
              </div>
            )}
          </div>
        </div>
        <div className="row  ">
          <div className=" col text-center align-items-center  ">
            {similarProduct.length > 0
              ? similarProduct.map((p) => (
                  <div
                    key={p._id}
                    className="d-inline-flex flex-wrap  m-1 p-3 "
                  >
                    <div className="card  ">
                      <img
                   src={p.imgLink?p.imgLink:`${apiUrl}/api/v1/product/photo-product/${p._id}`}                     
                   className="card-img-top img-fluid img-responsive"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h6 className="card-title text-center ">{p.name}</h6>
                        <p className="card-text ">
                          {p.description.substring(0, 20)}
                        </p>
                        <p className="card-text ">Price: ${p.price}</p>
                        <button
                          onClick={() => navigate(`/product-details/${p._id}`)}
                          className="btn btn-primary ms-1"
                        >
                          Details
                        </button>
                        <AddToCart id={p._id} />
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
