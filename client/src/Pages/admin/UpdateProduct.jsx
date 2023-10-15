import  { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useAuth } from "../../context/auth";
import { useNavigate, useParams } from "react-router-dom";
import useCategory from "../../Hooks/useCategory";
import RubberBand from 'react-reveal/RubberBand';
import {Fade} from 'react-reveal';
const apiUrl=import.meta.env.VITE_REACT_APP_API_URL;
const UpdateProduct = () => {
  const navigate = useNavigate();
  const categories = useCategory();

  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [imgLink, setimgLink] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [id, setID] = useState(null);
  const { Option } = Select;
  const [auth] = useAuth();
  const params = useParams();

  async function updateProduct(e) {
    e.preventDefault();
    try {
      if (
        !name ||
        !color ||
        !price ||
        !category ||
        !description
      ) {
        toast.error("please Fill and select required Things ");
      } else {
        const ProductData = new FormData();
        ProductData.append("category", category);
        ProductData.append("photo", photo);
        ProductData.append("name", name);
        ProductData.append("description", description);
        ProductData.append("imgLink", imgLink);
        ProductData.append("color", color);
        ProductData.append("price", price);
  
        let result = await fetch(
          `${apiUrl}/api/v1/product/update-product/${
            params.slug || id
          }`,
          {
            method: "PUT",
            headers: {
              Authorization: auth?.token,
            },
            body: ProductData,
          }
        );

        result = await result.json();
        if (result?.success) {
          toast.success(result?.message);
          navigate("/dashboard/admin/products");
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error("something went wrong");
      // console.log(error);
    }
  }
  //get category for select product category
  async function getSingleProduct() {
    let result = await fetch(
      `${apiUrl}/api/v1/product/single-product/${params.slug}`,
      { method: "GET" }
    );
    result = await result.json();
    // console.log(result.singleProduct);
    if (result?.success) {
      toast.success(result.message);
      setName(result.singleProduct.name);
      setimgLink(result.singleProduct.imgLink);
      setColor(result.singleProduct.color);
      setDescription(result.singleProduct?.description);
      setPrice(result.singleProduct.price);
      setCategory(result.singleProduct.category);
      setID(result.singleProduct._id);
    }
  }

  async function getSingleCategory(id) {
    let result = await fetch(
      `${apiUrl}/api/v1/category/single-category/${id}`,
      { method: "GET" }
    );
    result = await result.json();
    if (result?.success) {
      setCategory(result.singleCategory.name);
      toast.success(result.message);
    }
  }

  useEffect(() => {
    getSingleProduct();
   if(category) getSingleCategory(category)

    //eslint-disable-next-line
  }, []);
  const deleteProduct = async () => {
    try {
      let answer = window.confirm("Are You Sure to Delete ? ");
      if (answer) {
        let result = await fetch(
          `${apiUrl}/api/v1/product/delete-product/${id}`,
          { method: "delete", headers: { Authorization: auth?.token } }
        );
        result = await result.json();
        if (result?.success) {
          toast.success(result?.message);
          navigate("/dashboard/admin/products");
        } else {
          toast.error(result?.message);
        }
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Admin Update Product"}>
      <div className="container-fluid mb-5 pb-5">
        <AdminMenu />
        <div className="row">
          <div className="col-md-12 col">
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <RubberBand>
                  <h1 className="text-danger text-center ms-2">
                    Update Product
                  </h1>
                  </RubberBand>
                </div>
              </div>
              <Fade bottom>
                <div className="row">
                <div className="col ">
                  <div className=" form form-group text-center ms-2">
                    <div className="mb-3">
                      <Select
                        name="category"
                        showSearch
                        className="form-select mb-3"
                        bordered={false}
                        placeholder="Select Category"
                        size="large"
                        onChange={(value) => setCategory(value)}
                        value={category}
                      >
                        {categories?.map((c) => (
                          <Option key={c._id} value={c._id}>
                            {c.name}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-md-12 ">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>

                    <div className="mb-3">
                      {photo ? (
                        <div className="text-center px-2 mx-1">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="product_photo"
                            height={"200px"}
                            width={"250px"}
                            className="img img-fluid  img-responsive rounded"
                          />
                        </div>
                      ) : (
                        <div className="text-center px-2 mx-1">
                          <img
                            src={`${
                             apiUrl
                            }/api/v1/product/photo-product/${
                              params.slug || id
                            }`}
                            alt="product_photo"
                            height={"200px"}
                            width={"250px"}
                            className="img img-fluid img-responsive rounded"
                          />
                        </div>
                      )}
                    </div>
                    <RubberBand>
                        <h2 className="text-primary">OR</h2>
                      </RubberBand>
                    <div className="mb-3">
                        <input
                          type="text"
                          name="imgLink"
                          value={imgLink}
                          onChange={(e) => setimgLink(e.target.value)}
                          className="form-control text-center text-primary"
                          placeholder="  ImgLink.."
                        />
                      </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        className="form-control "
                        placeholder="  Name.."
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={description}
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control "
                        placeholder="  Description.."
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control "
                        placeholder="  Price.."
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="form-control "
                        placeholder="  Color.. .."
                        required
                      />
                    </div>

                 
                   

                    <div className="mb-3 ">
                      <button
                        type="submit"
                        onClick={updateProduct}
                        className="btn btn-primary p-1 mx-1 text-center"
                      >
                        Update Product
                      </button>

                      <button
                        className="btn btn-danger  p-1 mx-1 text-center"
                        onClick={deleteProduct}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </Fade>
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
