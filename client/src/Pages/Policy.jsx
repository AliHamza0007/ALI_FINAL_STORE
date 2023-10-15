
import {  Fade, LightSpeed } from "react-reveal";
import RubberBand from "react-reveal/RubberBand";
import Layout from "../components/Layout/Layout";
const Policy = () => {
  return (
    <Layout title={' Privacy Policy'}>
      
      <div className="container  py-5 ">
      <div className="row ">
      <div className="col-12  ">
        <RubberBand>

            <h3 className="text-primary text-center">Policy & Terms </h3>
        </RubberBand>
            <div className=" py-2">
             <LightSpeed>
                <h4>Privacy Policy of ALi_FINAL_STORE </h4>
                </LightSpeed> 

                <Fade right>
             <h6>
             Personal Information:
                
                </h6>
                <p>
                    When you visit the Site, we collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
                    </p> 
             <h6>
             Order Information:                
                </h6>
                <p>
                When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information including credit card numbers, email address, and phone number. We refer to this information as Order Information.   </p> 
             <h6>
             How We Use Your Information:                </h6>
             <p>
              
We use the Order Information that we collect generally to fulfill any orders placed through the Site including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations. Additionally, we use this Order Information to:

- Communicate with you;
- Screen our orders for potential risk or fraud; and
- When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.  </p> 
             <h6>
             Sharing Your Personal Information:               </h6>
             <p>
   
We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store. You can read more about how Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy.
 You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.
Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
  </p> 
  </Fade>
            </div>
            </div>
            </div>
            </div>
    </Layout>
  );
}

export default Policy;