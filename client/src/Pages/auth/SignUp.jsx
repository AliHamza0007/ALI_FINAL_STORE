import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import RubberBand from "react-reveal/RubberBand";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";
import * as EmailValidator from "email-validator";
import "./login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
const bgImg =
  "https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.webp";
const logo =
  "https://cdn.pixabay.com/photo/2022/04/17/21/19/register-now-7139037_1280.png";
// const sideImg="https://file.forms.app/sitefile/How-to-create-a-great-webinar-sign-up-form.jpg";
const sideImg =
  "https://cdn.pixabay.com/photo/2013/07/13/12/34/police-159894_1280.png";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const SubmitHandler = async (e) => {
    e.preventDefault();

    let validEmail = EmailValidator.validate(email);
    if (validEmail) {
      if (!name || !password || !email) {
        toast.error("Please Fill All Fields");
      } else if (password.length < 8) {
        toast.error("password min-length 8");
      } else {
        let resetToken = Math.floor(Math.random() * (300 * 1000));
        // console.log(resetToken);
        let result = await axios.post(`${apiUrl}/api/v1/auth/register`, {
        
            resetToken,
            name,
            password,
            email,
          });
        // console.log(res);
        if (result?.data.success) {
          // console.log(user);
          toast.success(result.data.message);
          localStorage.setItem("user", JSON.stringify(result.data.data));
          localStorage.setItem("token", JSON.stringify(result.data.auth));
          localStorage.setItem(
            "resetToken",
            JSON.stringify({ resetToken, email })
          );
          navigate("/login");
        }
      }
    } else {
      toast.error("Please Enter Valid Email Address");
    }
  };
  //'hideShown Password
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <Layout
      title={"Register Page"}
      keywords={"Free ,User SignUp,User register"}
    >
      <div
        style={{
          background: `url(${bgImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container text-center py-md-3  p-1 ">
          <div className="row bg-light ">
            <div className="col-md-6 ">
              <div className="bg-light p-md-5 form ">
             <RubberBand>

             <h4 className="text-uppercase text-danger fw-bold mb-4">
                  <img
                    className="img-fluid w-50"
                    src={logo}
                    alt="Register_Now"
                    />
                </h4>
                    </RubberBand>
               <Fade right>
                  <h5>it&apos;s free and always will be</h5>
                  <div className="input-group-lg my-3">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="abc@email.com..."
                      className="form-control "
                      autoFocus
                      required
                    />{" "}
                  </div>
                  <div className="input-group-lg my-3">
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Name------"
                      className="form-control pink"
                    />{" "}
                  </div>
                  <div className="input-group-lg my-3 position-relative">
                    <input
                      id="inputPassword"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="  form-control text-small "
                      type={passwordType}
                      required
                      name="password"
                      placeholder="Enter Password"
                    />
                    <button
                      id="showbtn"
                      className="px-2"
                      onClick={togglePassword}
                    >
                      {passwordType === "password" ? (
                        <AiFillEyeInvisible size={25} />
                      ) : (
                        <AiFillEye size={25} />
                      )}
                    </button>
                  </div>
                  <div className="form-group my-1">
                    <button
                      onClick={SubmitHandler}
                      type="submit"
                      className="btn btn-success text-center m-2"
                    >
                      SignUp
                    </button>
                  </div>
                  <div className="my-2  text-center">
                    Already User
                    <Link className="px-2" to="/login">
                      LogIn
                    </Link>
                  </div>
                  </Fade>
                </div>
             
            </div>
            <Fade left>
            <div className="hide col-md-6 text-center  align-items-center justify-content-center m-auto">
              <img width={"50%"} height={"50%"} src={sideImg} alt />
            </div>
            </Fade>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default SignUp;
