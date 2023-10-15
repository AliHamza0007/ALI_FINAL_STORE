import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
const Layout = ({ children, title, description, author, keywords }) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="mb-5 pb-5 ">
        
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "ALI_FINAL_STORE Beds & Sofas",
  description:
    "Every type products are available at any time ",
  keywords: "watch,phone,laptop,electronic,Free,Best",
  author: "ALI_FINAL_STORE By Hamza",
};

export default Layout;
