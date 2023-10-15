import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Fade, Rotate, LightSpeed } from "react-reveal";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
function ForgottenPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [firstpassword, setFirstPassword] = useState("");
  const [secondpassword, setSecondPassword] = useState("");
  const logo =
    "https://cdn.pixabay.com/photo/2020/03/17/17/36/database-4941302_1280.png";
  const bgImg =
    "https://cdn.pixabay.com/photo/2015/04/16/15/22/japan-725795_1280.jpg";
  const sideImg =
    "https://cdn.pixabay.com/photo/2022/12/03/20/17/mistake-7633351_1280.jpg";
  async function forgotPassword(e) {
    try {
      e.preventDefault();
      if (email === "" || firstpassword === "" || secondpassword === "") {
        toast.error("Please Fill All Fields");
      }
      if (firstpassword !== secondpassword) {
        toast.error("password is not same");
      }
      if (firstpassword < 8 || secondpassword < 8) {
        toast.error("Password AtLeast 8 charactors");
      } else {
        let confirmPassword = secondpassword;
        if (token) {
          let result = await axios.post(`${apiUrl}/api/v1/auth/reset-password`, { email, confirmPassword, token });
          if (result?.data.success) {
            toast.success(result.data.message);
            navigate("/login");
          } else toast.error(result.data.message);
        } else {
          toast.error("ResetToken not found Try Question Method");
        }
      }
    } catch (error) {
      // console.log(error);
      toast.error("error in reset password");
    }
  }
  //'hideShown Password
  const [firstpasswordType, setFirstPasswordType] = useState("password");
  const [secondpasswordType, setSecondPasswordType] = useState("password");

  const toggleFirstPassword = (e) => {
    e.preventDefault();

    if (firstpasswordType === "password") {
      setFirstPasswordType("text");
      return;
    }
    setFirstPasswordType("password");
  };
  const toggleSecondPassword = (e) => {
    e.preventDefault();

    if (firstpasswordType === "password") {
      setSecondPasswordType("text");
      return;
    }
    setSecondPasswordType("password");
  };
  useEffect(() => {
    let resetToken = JSON.parse(localStorage.getItem("resetToken"));
    if (resetToken) {
      setToken(resetToken?.resetToken);
      setEmail(resetToken?.email);
    }
  }, []);

  return (
    <Layout
      title={"Password Forgotten "}
      keywords={"Reset User Password,Forgotton Password"}
    >
      <LightSpeed>
        <div
          style={{
            background: `url(${bgImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div
            style={{ height: "70%" }}
            className="container py-md-3 p-1 text-center"
          >
            <div className="row  bg-light">
              <Rotate>
                <div className="col-md-6 hide">
                  <img className=" img-fluid h-100" src={sideImg} alt="Login" />
                </div>
              </Rotate>
              <Fade left>
                <div className="col-md-6 col-12">
                  <form className="form p-4">
                    <div className="form-group">
                      <h4 className="text-uppercase text-danger fw-bold mb-3">
                        <img
                          className="img-fluid w-25 shadow "
                          style={{ borderRadius: "100px" }}
                          src={logo}
                          alt="LOGIN_PAGE"
                          // width={'46px'}
                        />{" "}
                      </h4>{" "}
                      <div className=" text-danger h3">Reset Password</div>
                      <div className="input-group-lg my-3">
                        <input
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className="form-control my-3 rounded p-2 "
                          type="email"
                          placeholder="abc@gmail.com"
                          required
                          autoFocus
                        />
                      </div>
                      <div className="input-group-lg my-3 position-relative">
                        <input
                          id="inputPassword"
                          value={firstpassword}
                          onChange={(e) => {
                            setFirstPassword(e.target.value);
                          }}
                          className="form-control  rounded p-2  border-right-0  mb-1 "
                          type={firstpasswordType}
                          required
                          name="password"
                          placeholder="New Password"
                        />
                        <button
                          id="showbtn"
                          className="px-2"
                          onClick={toggleFirstPassword}
                        >
                          {firstpasswordType === "password" ? (
                            <AiFillEyeInvisible size={25} />
                          ) : (
                            <AiFillEye size={25} />
                          )}
                        </button>
                      </div>
                      <div className="input-group-lg my-3 position-relative">
                        <input
                          id="inputPassword"
                          value={secondpassword}
                          onChange={(e) => {
                            setSecondPassword(e.target.value);
                          }}
                          className="form-control  rounded p-2   mb-1 "
                          type={secondpasswordType}
                          required
                          name="password"
                          placeholder="Confirm Password"
                        />
                        <button
                          id="showbtn"
                          className="px-2"
                          onClick={toggleSecondPassword}
                        >
                          {secondpasswordType === "password" ? (
                            <AiFillEyeInvisible size={25} />
                          ) : (
                            <AiFillEye size={25} />
                          )}
                        </button>
                      </div>
                      <div className="form-group ">
                        <button
                          type="submit"
                          onClick={forgotPassword}
                          className="btn btn-success text-center  m-3"
                        >
                          Login
                        </button>
                      </div>
                      <div className="my-2 text-center">
                        <Link to="/login">I Remember One</Link>
                      </div>
                    </div>
                    <div>Copyright © 2023 — ALI_FINAL_STORE</div>
                  </form>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </LightSpeed>
    </Layout>
  );
}
export default ForgottenPassword;
