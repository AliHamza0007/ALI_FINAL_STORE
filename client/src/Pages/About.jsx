import Layout from "../components/Layout/Layout";
import { Fade ,Rotate} from "react-reveal";
const bg='https://cdn.pixabay.com/photo/2014/08/15/06/16/imprint-418594_1280.jpg'
const About = () => {
  return (
    <Layout title={"About US"}>
 <div
          className="pt-md-5 py-2"
          style={{
            background: `URL(${bg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
        >      <div className=" text-center container py-5 ">
        <div className=" row">
          <div className="  col col-12 ">
            <Rotate>
              <h5 className="text-danger h1">About Us</h5>
            </Rotate>
            <div className=" py-2 text-start  h2">
              <Fade left>
                <p>
                  Welcome to ALI_FINAL_STORE, where comfort meets quality. We're
                  more than a  store we're your home's companions. With
                  a passion for crafting cozy spaces, our journey is guided by
                  warmth, style, and care. Every piece tells a story of
                  craftsmanship and dedication. We believe in creating harmony,
                  embracing uniqueness, and making your home truly yours. Join
                  us in shaping comfort together.we Plans to give Comfort to you
                </p>
              </Fade>
            </div>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
