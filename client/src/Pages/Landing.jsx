import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import useCategory from "../Hooks/useCategory";
import useProduct from "../Hooks/useProduct";
import RubberBand from "react-reveal/RubberBand";
import { Fade, Rotate, LightSpeed } from "react-reveal";
import ScrollToTop from "react-scroll-to-top";

import Typewriter from "typewriter-effect";

import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const saleBg =
  "https://cdn.pixabay.com/photo/2017/11/29/13/28/a-discount-2986181_1280.jpg";
const img2 =
  "https://img.freepik.com/premium-vector/flash-sale-banner-template_252779-67.jpg?w=826";
const img3 =
  "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
const img4 =
  "https://cdn.pixabay.com/photo/2017/11/06/13/50/family-2923690_1280.jpg";
const img5 =
  "https://img.freepik.com/free-psd/black-friday-super-sale-social-media-banner-template_106176-1508.jpg?w=740&t=st=1697345206~exp=1697345806~hmac=329bc96db3f1d21fa5d3cda5ac95b6e6777dc9235e813eb153952e4819c7cef2";
const img6 =
  "https://img.freepik.com/free-vector/modern-black-friday-brush-stroke-super-sale_1361-1803.jpg?w=740&t=st=1697345272~exp=1697345872~hmac=d8dfa20ac851eeaa37670cc7a809f50f2d53c996857ec5a99322222ff37787ed";

const productsImg =
  "https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80";
const deliveryImg =
  "https://images.unsplash.com/photo-1582902281043-69c645f40cd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80";
const Home = () => {
  //   const navigate = useNavigate();

  const categories = useCategory();
  const navigate = useNavigate();
  const products = useProduct();
  useEffect(() => {
    setTimeout(() => {
      toast.success("Welcome To ALI_FINAL_STORE");
    }, 2000);
  }, []);

  return (
    <Layout
      title={"Store Products"}
      keywords={"Watchs ,Phones,Laptops,Free"}
      description={
        "Every type products are available at any time "
      }
    >
      <LightSpeed>
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item  ">
              <img
                src={saleBg}
                className="d-block   w-100 "
                alt="ALI_FINAL_STORE"
              />
            </div>
            <div className="carousel-item  ">
              <img
                src={img2}
                className="d-block w-100 "
                alt="ALI_FINAL_STORE"
              />
            </div>
            <div className="carousel-item">
              <img
                src={img3}
                className="d-block w-100 "
                alt="ALI_FINAL_STORE"
              />
            </div>
            <div className="carousel-item">
              <img
                src={img4}
                className="d-block w-100 "
                alt="ALI_FINAL_STORE"
              />
            </div>
            <div className="carousel-item">
              <img
                src={img5}
                className="d-block w-100 "
                alt="ALI_FINAL_STORE"
              />
            </div>

            <div className="carousel-item  active">
              <img
                src={img6}
                className="d-block w-100 "
                alt="ALI_FINAL_STORE "
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </LightSpeed>

      <div className="container py-3">
        <div className="row">
          <div className="col text-center">
            <RubberBand>
              <h3 className="text-primary">Browse Our Categories</h3>
            </RubberBand>
          </div>
        </div>
        <Rotate>
          <div className="row py-2">
            <div className="col text-center">
              {categories?.map((c) => (
              
                  <button key={c._id} className="btn btn-outline-success px-3 m-1">
                    <Link
                      className="nav-link text-danger"
                      to={`/category/${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </button>
              
              ))}
            </div>
          </div>
        </Rotate>

        <div className="row py-2">
          <div className="col ">
            <Fade right>
              <h3 className="text-danger">Latests Products</h3>
            </Fade>
            {products?.slice(0, 4).map((product) => (
              <Link
                to="/products"
                key={product._id}
                className="d-inline-flex nav-link flex-wrap   p-3 "
              >
                <div className="card border-red">
                  <img
                    src={product.imgLink?product.imgLink:`${apiUrl}/api/v1/product/photo-product/${product._id}`}
                    className="card-img-top img-fluid img-responsive"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <p className="card-text ">
                      {product.description.substring(0, 20)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div
          onClick={() => navigate("/products")}
          className="row py-3 text-center"
        >
          <h3 className="bg-danger text-white p-3 rounded">
            <Typewriter
              options={{
                strings: [
                  " We supply a huge range of quality products across the World. Shop Now!",
                  "First Buy Then Pay!",
                  "We Deals With Brands!",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h3>
        </div>
        <div className="row cursor-pointer py-3">
          <div className="col-md-6 border-red  py-2 ">
            <div className="img-fluid img-responsive">
              <img
                src={productsImg}
                className="w-100 h-50"
                alt="ALI_FINAL_STORE"
              />
            </div>
            <h5 className="  pt-5 ">
              <Fade left>
                Need something in a hurry? We have a huge range of bproducts
                available for delivery to you as quickly as the very next day.
              </Fade>
            </h5>
          </div>
          <div className="col-md-6 border-red  py-2 ">
            <div className="img-fluid img-responsive">
              <img
                src={deliveryImg}
                className=" w-100 h-50"
                alt="ALI_FINAL_STORE"
              />
            </div>
            <h5 className=" pt-5  ">
              <Fade right>
                With many years of experience behind us, our dedicated team know
                how to make our customers happy. Great value, fast
                communication, speedy delivery and top customer service all come
                as standard.
              </Fade>
            </h5>
          </div>
        </div>
        <div
          onClick={() => navigate("/products")}
          className="row py-3 text-center"
        >
          <h3 className="bg-danger text-white p-3 rounded">
            <Typewriter
              options={{
                strings: [
                  " We supply a huge range of quality products across the World. Shop Now!",
                  "First Buy Then Pay!",
                  "We Deals With Brands!",
                ],
                autoStart: true,
                loop: true,
              }}
            />{" "}
          </h3>
        </div>
      </div>
      <ScrollToTop
        smooth
        color="white"
        style={{ backgroundColor: "#1e1e2c", borderRadius: "80px" }}
      />
    </Layout>
  );
};

export default Home;
