import { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout/Layout";
import { Rotate, Fade } from "react-reveal";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const bgImg =
  "https://cdn.pixabay.com/photo/2016/02/07/21/03/computer-1185626_1280.jpg";
const img =
  "https://cdn.pixabay.com/photo/2019/11/04/01/11/cellular-4599956_1280.jpg";
const Contact = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const contact = async (e) => {
    e.preventDefault();
 
    if (!email || !message || !phone) {
      toast.error("Fill All Details");
    }
    let result = await axios.post(` ${apiUrl}/api/v1/contact`, { email, phone, message });
    
    if (result?.data.success) {
      toast.success(result.data.message);
    } else {
      toast.error(result.data.message);
    }
  };
  return (
    <Layout title={"Contact US"}>
      <Fade left>
        <div
          className="pt-md-5 py-2"
          style={{
            background: `URL(${img})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
        >
          <Rotate>
            <div
              style={{
                background: `URL(${bgImg})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className="container w-md-50 text-center mt-2 py-2 p-1"
            >
              <div className="row">
                <div className="col">
                  <form className="form-group text-danger px-5">
                    <h2>Leave A Message</h2>

                    <input
                      value={email}
                      autoFocus
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Enter Valid Email"
                      className="form-control mb-2 "
                    />

                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="number"
                      placeholder="Enter Phone"
                      className="form-control mb-2 "
                    />

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-control mb-2"
                      placeholder="Enter Msg"
                    ></textarea>
                    <button
                      className="btn btn-success  m-2 px-3 "
                      onClick={(e) => contact(e)}
                    >
                      Send MSG
                    </button>
                  </form>
                </div>
              </div>
            </div>{" "}
          </Rotate>
        </div>
      </Fade>
    </Layout>
  );
};

export default Contact;
