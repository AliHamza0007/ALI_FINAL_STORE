
import { AiOutlineMail, AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";
import ReactWhatsapp from "react-whatsapp";
import Typewriter from "typewriter-effect";

const Footer = () => {

  return (

  <footer className="bg-dark footer py-3 text-center  text-white mb-0">
  <div className="container">
    <div className="row  text-start py-5">
      <div className="col-md-3"> <h4 className="text-uppercase text-danger fw-bold mb-4">
      ALI_FINAL_STORE  </h4> </div>
      <div className="col-md-3">
        <h3 className="text-danger">Developer</h3>
        <Typewriter 
                options={{
                  strings: [
                    "React Developer",
                   "Full Stack Developer",
                   "MERN Developer",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              /> 
        <h6> <AiOutlineUser /> ALI HAMZA </h6>
        <h5><AiOutlineMail />hamzasarwer9@</h5>
        <h5><AiOutlinePhone /> +923097300913
              </h5>
              <h5>
                <ReactWhatsapp
                  className=" text-success p-2 rounded"
                  number="+923097300913"
                >
                  <BsWhatsapp /> WhatsApp
                </ReactWhatsapp>
              </h5>
      </div>
      <div className="col-md-3">
        <h3 className="text-danger">Company</h3>
        <h6><Link className="nav-link w-25" to="/about">About</Link></h6>
        <h6><Link className="nav-link w-50" to="/comunity"> Community</Link></h6>
        <h6><Link className="nav-link w-50" to="/contact"> ContactUs</Link></h6>
        <h6><Link className="nav-link w-50" to="/policy"> PrivacyPolicy</Link></h6>
      </div>
      <div className="col-md-3">
        <h3 className="text-danger">Social</h3>
        <Link to="https://facebook.com/" target="_blank" className="nav-link"><i style={{color: '#ffffff'}} className=" fa fa-facebook me-3" />Facebook</Link>
        <Link to="https://www.instagram.com/" target="_blank" className="nav-link"><i style={{color: '#ffffff'}} className=" fa-brands fa-instagram me-3" />Instagram</Link>
        <Link to="https://www.youtube.com/" target="_blank" className="nav-link"><i style={{color: '#ffffff'}} className=" fa-brands fa-youtube me-3" />YouTube</Link>
        <Link to="https://www.linkedin.com/" target="_blank" className="nav-link"><i style={{color: '#ffffff'}} className=" fa-brands text-white fa-linkedin me-3" />LinkedIn</Link>
        <Link to="http://twitter.com/" target="_blank" className="nav-link"><i style={{color: '#ffffff'}} className=" fa-brands fa-twitter me-3" />Twitter</Link>
      </div>
    </div>
  </div>
  <hr />
  &copy; 2023 ALI_FINAL_STORE Services All Rights Reserved.
        <hr />

 
         
          
      
</footer>


  );
};

export default Footer;
