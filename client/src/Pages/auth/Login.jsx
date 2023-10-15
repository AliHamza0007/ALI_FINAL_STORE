import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";
import { Fade ,LightSpeed, Rotate } from "react-reveal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Login.css";
import * as EmailValidator from "email-validator";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
function Login() {
  const logo =
    "https://cdn.pixabay.com/photo/2017/03/21/02/00/user-2160923_1280.png";
  const sideImg =
    "https://cdn.pixabay.com/photo/2023/02/12/01/52/leadership-7784017_1280.jpg";
  const bgImg =
    "https://media.istockphoto.com/id/1426988809/photo/security-password-login-online-concept-hands-typing-and-entering-username-and-password-of.webp?b=1&s=170667a&w=0&k=20&c=AJD5Wv30lmyILccJyMpQGhkmh0VhZ5WNDtk53MO1OVM=";
  console.log(apiUrl);
  const navigate = useNavigate();
  const Location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [auth, setAuth] = useAuth();
  const LogIn = async (e) => {
    e.preventDefault();
    if (email === "" && password === "") {
      toast.error("Please Fill All Fields");
    }
    let validEmail = EmailValidator.validate(email);
    if (validEmail) {
      if (password.length < 8) {
        toast.error("Password Must be minimum 8 charactors");
      } else {
        let result = await axios.post(`${apiUrl}/api/v1/auth/login`,{ email, password });
        if (result?.data.success) {
          toast.success(result.data.message);
          setAuth({ ...auth, user: result.data.user, token: result.data.token });
          localStorage.setItem("auth", JSON.stringify(result.data));
          navigate(Location.state || "/");
        } else {
          toast.error(result.data.message);
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
    <Layout title={"Login page"} keywords={"User login,SignIn,LogIn"}>
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
              <div className="col-md-6 hide">
                <Fade right>
                  <img className=" img-fluid h-100" src={sideImg} alt="Login" />
                </Fade>
              </div>
              <Rotate >
                <div className="col-md-6 col-12">
                  <form className="form p-4">
                    <div className="form-group">
                      <h4 className="text-uppercase text-danger fw-bold mb-4">
                        <img
                          className="img-fluid w-25 shadow "
                          style={{ borderRadius: "100px" }}
                          src={logo}
                          alt="LOGIN_PAGE"
                          // width={'46px'}
                        />{" "}
                      </h4>
                      <div className="input-group-lg my-3">
                        <input
                          value={email}
                          autoFocus
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          type="email"
                          required
                          className="form-control "
                          placeholder="abc@gmail.com"
                        />
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
                      <Link to="/resetPassword" className="float-right">
                        Forgot Password?
                      </Link>
                      <div className="form-group ">
                        <button
                          type="submit"
                          onClick={LogIn}
                          className="btn btn-success text-center  m-3"
                        >
                          Login
                        </button>
                      </div>
                      <div className="my-2 text-center">
                        Don&lsquo;t have an account?
                        <Link to="/register">Create One</Link>
                      </div>
                    </div>
                    <div>Copyright © 2023 — ALI_FINAL_STORE</div>
                  </form>
                </div>
              </Rotate>
            </div>
          </div>
        </div>
      </LightSpeed>
    </Layout>
  );
}

export default Login;
