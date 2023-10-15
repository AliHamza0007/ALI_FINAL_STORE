import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Calender from "../admin/DashboardDec/Calender";
import Donut from "../admin/DashboardDec/Donut";
import { Fade, Rotate, LightSpeed } from "react-reveal";
import RubberBand from "react-reveal/RubberBand";
const Dashboard = () => {
  const [auth] = useAuth();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const [pending, setPending] = useState([]);
  const [delivered, setDelivered] = useState([]);
  // for seeing order pending
  const getOrder = async (id) => {
    let result = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/order/get-order/${id}`,
      { method: "get", headers: { Authorization: auth?.token } }
    );
    result = await result.json();
    if (result?.success) {
      let filterOrder = result.order.filter(
        (o) => o.userId === auth?.user.id || auth?.user._id
      );

      // console.log(filterOrder);
      setOrder(filterOrder);
      setPending(filterOrder.filter((o) => o.status === "pending"));
      setDelivered(filterOrder.filter((f) => f.status === "Delivered"));
    }
  };
  const date = (createdAt) => {
    const ReadAbleDate = new Date(createdAt);
    const date = ReadAbleDate.toDateString();
    return date;
  };
  useEffect(() => {
    const id = auth?.user?.id || auth?.user?._id;
    getOrder(id);
    // eslint-disable-next-line
  }, []);
  return (
    <Layout
      title={"ALI_FINAL_STORE User DashBoard"}
      keywords={"Dashboard ,User Orders,User Details,Free"}
    >
      {" "}
      <div className="container-fluid ">
        <UserMenu />
        <div className="row  ">
          <div className="col-md-8 col  ">
            <LightSpeed>
              <div className=" bg-info m-3   p-2 text-white  ">
                <h1>{auth?.user?.name}</h1>
                <h5>
                  Hi {auth?.user?.name} WellCome to our best Platform to
                  purchase Some different from us ,We sell Quality not products.
                </h5>
                <h5>Dear Please View Details</h5>
                <h4>Name {auth?.user?.name}</h4>
                <h4>Email {auth?.user?.email}</h4>
               
                <h4>
                  <button
                    className="btn btn-primary px-3"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update
                  </button>
                </h4>
              </div>
            </LightSpeed>
          </div>
          <Rotate>
            <div className="col-md-4 pt-4 col">
              <Calender />
            </div>
          </Rotate>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row text-center py-2">
              <div className="col-md-6 col ">
                <div className=" p-4 bg-primary text-center text-white rounded">
                  <Fade right>
                    <h4>Pending Orders {pending?.length}</h4>
                  </Fade>
                </div>
              </div>
              <div className="col-md-6 col ">
                <div className=" p-4  bg-success text-center text-white rounded">
                  <Fade left>
                    <h4>Delivered Orders {delivered?.length}</h4>
                  </Fade>
                </div>
              </div>
            </div>
            <RubberBand>
              <div className="table-responsive p-1">
                <table className="table table-striped table-bordered">
                  <thead className="table-primary">
                    <tr>
                      <th>OrderDate</th>
                      <th>Status</th>
                      <th>Customer</th>
                      <th>Products</th>
                      <th>TotalPrice</th>
                    </tr>
                  </thead>
                  <tbody className=" table-hover table-warning">
                    {order?.length > 0 ? (
                      order?.slice(0, 5).map((o, i) => (
                        <tr key={i}>
                          <td>{date(o.createdAt)}</td>

                          <td>{o.status}</td>
                          <td>{o.username}</td>
                          <td>
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th scope="col">Name</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Quantity</th>
                                </tr>
                              </thead>
                              <tbody className="table-info table-hover">
                                {o?.cartItems?.map((p) => (
                                  <tr key={p.product}>
                                    <td>{p.name}</td>
                                    <td>${p.price}</td>
                                    <td>{p.quantity}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                          <td>${o.totalPrice}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>Sorry Not Record Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </RubberBand>
          </div>
          <div className="col-md-4 col p-1">
            <Rotate>
              <Donut />
            </Rotate>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
