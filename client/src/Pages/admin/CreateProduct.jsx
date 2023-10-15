import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import useCategory from "../../Hooks/useCategory";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { Fade } from "react-reveal";
import RubberBand from "react-reveal/RubberBand";
const CreateProduct = () => {
  const categories = useCategory();
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [imgLink, setimgLink] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const { Option } = Select;
  const [auth] = useAuth();
  const navigate = useNavigate();

  async function saveProduct(e) {
    e.preventDefault();
    try {
      if (
        !name ||
        (!photo && !imgLink) ||
        !color ||
        !price ||
        !category ||
        !description
      ) {
        toast.error("please Fill and select required Things ");
      }

      const ProductData = new FormData();
      ProductData.append("category", category);
      ProductData.append("photo", photo);
      ProductData.append("name", name);
      ProductData.append("description", description);
      ProductData.append("imgLink", imgLink);
      ProductData.append("color", color);
      ProductData.append("price", price);

      let result = await fetch(`${apiUrl}/api/v1/product/create-product`, {
        method: "POST",
        headers: {
          Authorization: auth?.token,
        },
        body: ProductData,
      });

      result = await result.json();
      if (result?.success) {
        toast.success(result?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("something went wrong");
      // console.log(error);
    }
  }

  return (
    <Layout title={"Admin Add  Product"}>
      <div className="container  mb-5 pb-5">
        <AdminMenu />
        <div className="row">
          <div className="col-md-12 col">
            <div className="container text-center">
              <div className="row">
                <div className="col">
                  <RubberBand>
                    <h1 className="text-danger text-center ms-2">
                      Add Product
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
                            name="image"
                            accept="image/*"
                            onChange={(e) => {
                              setPhoto(e.target.files[0]);
                            }}
                            hidden
                          />
                        </label>
                      </div>

                      <div className="mb-3">
                        {photo && (
                          <div className="text-center">
                            <img
                              height={"200px"}
                              width={"250px"}
                              src={URL.createObjectURL(photo)}
                              alt={photo.name + "loading.."}
                              className="img  img-fluid img-responsive rounded"
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

                      <Fade bottom>
                        <div className="mb-3">
                          <button
                            type="submit"
                            onClick={saveProduct}
                            className="btn btn-primary p-1 text-center ms-2"
                          >
                            Save Product
                          </button>
                        </div>
                      </Fade>
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

export default CreateProduct;
