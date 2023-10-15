import { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import Category from "./Category";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { Modal } from "antd";
import RubberBand from "react-reveal/RubberBand";
import Fade from "react-reveal/Fade";
const ManageCategory = () => {
  //for getting category details
  const [category, setCategory] = useState([]);
  //for visble and show a update component
  const [visible, setVisible] = useState(false);
  //for save categry name

  const [name, setName] = useState("");
  //for updateing data categry name
  const [updateName, setUpdateName] = useState("");
  const [selected, setSelected] = useState(null);
  //for auth token checking
  const [auth] = useAuth();

  async function SaveCategory(e) {
    try {
      e.preventDefault();
      let categorySave = await fetch(
        `${apiUrl}/api/v1/category/create-category`,
        {
          method: "POST",
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      categorySave = await categorySave.json();
      if (categorySave?.success) {
        toast.success(`${categorySave.category.slug} is created`);
        getCategory();
        setName("");
      } else {
        toast.error(categorySave.message);
      }
    } catch (error) {
      toast.error("error in Creating Category");
      // console.log(error);
    }
  }

  async function updateCategory(e) {
    e.preventDefault();
    try {
      let updatecategory = await fetch(
        `${apiUrl}/api/v1/category/update-category/${selected._id}`,
        {
          method: "put",
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: updateName }),
        }
      );
      updatecategory = await updatecategory.json();
      if (updatecategory?.success) {
        toast.success(`${updatecategory.updateCategory.slug} is updated`);
        getCategory();
        setUpdateName("");
        setVisible(false);
      } else {
        toast.error(updatecategory.message);
      }
    } catch (error) {
      toast.error("error in updating Category");
      // console.log(error);
    }
  }

  async function getCategory() {
    let getCategory = await fetch(`${apiUrl}/api/v1/category/get-category`, {
      method: "get",
    });
    getCategory = await getCategory.json();
    if (getCategory?.success) {
      setCategory(getCategory?.getCategory);
      toast.success(getCategory.message);
    }
    // console.log(category);
  }

  async function deleteCategory(id) {
    let deleteCategory = await fetch(
      `${apiUrl}/api/v1/category/delete-category/${id}`,
      { method: "delete", headers: { Authorization: auth?.token } }
    );
    deleteCategory = await deleteCategory.json();

    if (deleteCategory?.success) {
      toast.success(`${deleteCategory.deleteCategory.name} Deleted`);
      getCategory();
    }
  }
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Layout title={"Admin Manage  Category"}>
      <div className="container mb-5 pb-5">
        <AdminMenu />
        <div className="row">
          <div className="col col-12 text-center">
            <h1 className=" border-bottom text-primary p-2">
              <RubberBand>Manage Category</RubberBand>
            </h1>

            <Fade left>
              <Category
                name={name}
                setName={setName}
                SaveCategory={SaveCategory}
              />
            </Fade>
            <table className="table   ">
              <thead>
                <tr>
                  <th>Category</th>

                  <th>Action</th>
                </tr>
              </thead>
              <Fade right>
                <tbody>
                  {category?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.slug}</td>
                      <td>
                        <button
                          className="btn btn-primary p-1 mx-1"
                          onClick={() => {
                            setVisible(true);
                            setSelected(c);
                            setUpdateName(c.name);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger p-1 mx-1"
                          onClick={() => deleteCategory(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Fade>
            </table>
          </div>

          <Modal
            onCancel={() => setVisible(false)}
            open={visible}
            footer={null}
          >
            <Category
              name={updateName}
              setName={setUpdateName}
              SaveCategory={updateCategory}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default ManageCategory;
